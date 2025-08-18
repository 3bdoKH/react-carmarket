import SearchBar from '../ui/SearchBar';
import { useTranslation } from 'react-i18next';
import type { ServiceCategory } from '../../types/service';
import { useState, useEffect, useRef } from 'react';
import './header.css';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onSearch: (term: string, category?: ServiceCategory, city?: string) => void;
  search: boolean;
  showCity?: boolean;
  immediateSearch?: boolean;  
  searchT?: boolean;
}

export default function Header({ onSearch, search, showCity = false, immediateSearch = false, searchT = false }: HeaderProps) {
  const { t, i18n } = useTranslation('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on the toggle button or navigation
      if (
        toggleRef.current?.contains(target) ||
        navRef.current?.contains(target)
      ) {
        return;
      }
      
      setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLanguageSwitch = () => {
    const nextLocale = i18n.language === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', nextLocale);
    i18n.changeLanguage(nextLocale);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-top">
          <div className="header-brand">
            <Link to="/" className="brand-link" onClick={() => setMenuOpen(false)}>
              <img 
                src="/car-market-high-resolution-logo-transparent.png" 
                alt="Car Market Logo" 
                className="brand-logo"
              />
            </Link>
          </div>

          <div className="header-actions">
            {search && (
              <div className="header-search-container">
                <SearchBar onSearch={onSearch} showCity={showCity} search={search} immediateSearch={immediateSearch} searchT={searchT} />
              </div>
            )}
            
            <button
              className="language-switch-btn"
              onClick={handleLanguageSwitch}
              aria-label={`Switch to ${i18n.language === 'en' ? 'Arabic' : 'English'}`}
            >
              <span className="language-icon">🌐</span>
              <span className="language-text">
                {i18n.language === 'en' ? 'Ar' : 'En'}
              </span>
            </button>

            <button
              ref={toggleRef}
              className={`menu-toggle ${menuOpen ? 'active' : ''}`}
              onClick={handleMenuToggle}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        <nav 
          ref={navRef}
          className={`site-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav_home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/services" 
                className={`nav-link ${isActiveRoute('/services') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav_services')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${isActiveRoute('/about') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav_about')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/blog" 
                className={`nav-link ${isActiveRoute('/blog') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav_blog')}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={`nav-link ${isActiveRoute('/contact') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t('nav_contact')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
