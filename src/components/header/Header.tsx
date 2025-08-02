import SearchBar from '../ui/SearchBar';
import { useTranslation } from 'react-i18next';
import type { ServiceCategory } from '../../types/service';
import { useState, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
interface HeaderProps {
  onSearch: (term: string, category?: ServiceCategory, city?: string) => void;
  search: boolean;
  showCity?: boolean;
  immediateSearch?: boolean;  
}

export default function Header({ onSearch, search, showCity = false }: HeaderProps) {
  const { t, i18n } = useTranslation('common');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  const handleLanguageSwitch = () => {
    const nextLocale = i18n.language === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', nextLocale);
    i18n.changeLanguage(nextLocale);
  };

  return (
    <header className="site-header">
      <div className='inner-header'>
        <div className="site-title"><img src="/car-market-high-resolution-logo-transparent.png" alt="Car Market Logo" /></div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-icon">&#9776;</span>
        </button>
        {search && <div className="header-search"><SearchBar onSearch={onSearch} showCity={showCity} /></div>}
      </div>
      <nav className={`site-nav${menuOpen ? ' open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_home')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_about')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_contact')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_blog')}</Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_services')}</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLanguageSwitch} className="language-switch-btn">
              {i18n.language === 'en' ? 'Ar' : 'En'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
