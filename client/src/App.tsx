import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './components/About';
import Header from './components/Header';

function App() {
  return (
    <div className="relative flex flex-row h-screen">
      <Header />

      <main className="relative flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
