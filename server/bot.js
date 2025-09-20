// bot.js
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers';
import { MultiQueryRetriever } from 'langchain/retrievers/multi_query';
import { ChatOllama } from '@langchain/ollama';
import path from 'path';
import { env as HFEnv } from '@huggingface/transformers';
import { bootstrap } from 'global-agent';
bootstrap();
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const TEMPLATE = `
你是一个二级市场的策略分析师，精通债券市场，股票市场，宏观政策和金融监管体制的专业知识，根据行情和外部环境变化，来给出专业的数据分析和观点总结，目的是为了达到总体稳健的投资目标，目标年化收益在8-10%。

以下是原文中跟用户回答相关的内容：
{context}

现在，你需要基于原文，回答以下问题：
{question}`;

const prompt = ChatPromptTemplate.fromTemplate(TEMPLATE);

const convertDocsToString = documents => {
  return documents.map(document => document.pageContent).join('\n');
};

async function askQuestion(question) {
  // 1. Set up Transformers.js to use a mirror (consistent with ingest.js)
  HFEnv.remoteHost = process.env.HF_ENDPOINT || 'https://hf-mirror.com';
  HFEnv.useFsCache = true;
  HFEnv.cacheDir = './.cache/transformers';

  // 2. Initialize Embeddings
  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: path.resolve('./models/thenlper-gte-large-zh'),
  });

  // 3. Load FaissStore vector store
  const vectorStore = await FaissStore.load('./faiss', embeddings);

  // 4. Initialize Ollama local model
  const llm = new ChatOllama({
    model: 'llama3.2',
    baseUrl: 'http://localhost:11434',
    temperature: 0.2,
    streaming: true,
  });

  // 5. Build new retriver
  const retriever = MultiQueryRetriever.fromLLM({
    llm: llm,
    retriever: vectorStore.asRetriever(3),
    queryCount: 3,
    verbose: true,
  });

  // 5. Build new RAG chain
  const contextRetriverChain = RunnableSequence.from([
    input => input.question,
    retriever,
    convertDocsToString,
  ]);

  const ragChain = RunnableSequence.from([
    {
      context: contextRetriverChain,
      question: input => input.question,
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  const stream = await ragChain.stream({ question: question });
  return stream;
}

export { askQuestion };
