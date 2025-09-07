import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="gradient-bg px-8 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center text-white font-semibold text-xl transition-transform duration-300 hover:scale-105"
          >
            <span className="text-2xl mr-2">📈</span>
            <span className="gradient-text bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              策略分析师
            </span>
          </Link>
        </div>

        <div
          className={`flex gap-8 items-center transition-all duration-300 ${
            isMenuOpen
              ? 'fixed top-16 left-0 right-0 gradient-bg flex-col p-8 gap-4 shadow-lg opacity-100 visible translate-y-0'
              : 'hidden md:flex'
          }`}
        >
          <Link
            to="/"
            className={`text-white font-medium px-4 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
              location.pathname === '/'
                ? 'bg-white/20 shadow-lg'
                : 'hover:bg-white/10 hover:-translate-y-0.5'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            💬 聊天助手
          </Link>
          <Link
            to="/about"
            className={`text-white font-medium px-4 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
              location.pathname === '/about'
                ? 'bg-white/20 shadow-lg'
                : 'hover:bg-white/10 hover:-translate-y-0.5'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            ℹ️ 关于我们
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col bg-transparent border-none cursor-pointer p-2"
          onClick={toggleMenu}
          aria-label="切换菜单"
        >
          <span
            className={`w-6 h-0.5 bg-white mb-1.5 rounded transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white mb-1.5 rounded transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white rounded transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>
      </div>
    </nav>
  );
}
