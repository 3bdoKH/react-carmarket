import SearchBar from '../ui/SearchBar';
import { useTranslation } from 'react-i18next';
import type { ServiceCategory } from '../../types/service';
import { useState, useEffect } from 'react';
import './header.css';

interface HeaderProps {
  onSearch: (term: string, category?: ServiceCategory, city?: string) => void;
  search: boolean;
  showCity?: boolean;
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
            <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_home')}</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_about')}</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_contact')}</a>
          </li>
          <li className="nav-item">
            <a href="/blog" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_blog')}</a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-link" onClick={() => setMenuOpen(false)}>{t('nav_services')}</a>
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
