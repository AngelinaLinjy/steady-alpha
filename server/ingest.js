import fs from "fs";
import path from "path";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { env as HFEnv } from "@huggingface/transformers";

import { bootstrap } from 'global-agent'; bootstrap();

async function main() {
  // Set up Transformers.js to use a mirror (Node need to set in the process)
  HFEnv.remoteHost = process.env.HF_ENDPOINT || "https://hf-mirror.com";
  // Optional: set local cache directory to avoid duplicate downloads
  HFEnv.useFsCache = true;
  HFEnv.cacheDir = "./.cache/transformers";
  // 1. Configure splitter
  const splitter = new CharacterTextSplitter({
    separator: "\n\n",
    chunkSize: 500,
    chunkOverlap: 50,
  });

// 2. Initialize HuggingFace Embeddings
//   const embeddings = new HuggingFaceTransformersEmbeddings({
//     modelName: "BAAI/bge-m3",
//   });

  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: "thenlper/gte-large-zh",
  });

  // 3. Initialize Chroma local vector store
  const vectorStore = new FaissStore(embeddings, {});

  // 4. Traverse private data
  const dir = path.resolve("./private_data");
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file); 
    
    let docs = [];
  
    if (file.endsWith(".pdf")) {
      // Use PDFLoader
      const loader = new PDFLoader(filePath);
      docs = await loader.load();
    } else {
      // Text file
      const text = fs.readFileSync(filePath, "utf-8");
      docs = [{ pageContent: text, metadata: { filename: file } }];
    }
  
    // 5. Text splitting
    let chunks = [];
    for (const doc of docs) {
      const docChunks = await splitter.splitText(doc.pageContent);
      chunks.push(...docChunks.map(chunk => ({
        pageContent: chunk,
        metadata: { filename: file }
      })));
    }

    // 6. Vectorize and store
    await vectorStore.addDocuments(chunks);

    console.log(`✅ Ingested ${file} with ${chunks.length} chunks`);
  }
  await vectorStore.save("./faiss");

  console.log("🎉 All files ingested successfully!");
}

main().catch(err => console.error(err));
