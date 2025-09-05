import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="header-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <span className="logo-icon">📈</span>
            <span className="logo-text">策略分析师</span>
          </Link>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            💬 聊天助手
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            ℹ️ 关于我们
          </Link>
        </div>

        <button 
          className="nav-toggle" 
          onClick={toggleMenu}
          aria-label="切换菜单"
        >
          <span className={`nav-toggle-line ${isMenuOpen ? 'nav-toggle-line-open' : ''}`}></span>
          <span className={`nav-toggle-line ${isMenuOpen ? 'nav-toggle-line-open' : ''}`}></span>
          <span className={`nav-toggle-line ${isMenuOpen ? 'nav-toggle-line-open' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
