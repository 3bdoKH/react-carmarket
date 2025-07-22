import React from "react";
import { useTranslation } from 'react-i18next';
import { FiMail } from 'react-icons/fi';
import { FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import './footer.css'
import './footerFeatureBar.css'
const categories = [
    { key: 'repair', link: '/category/repair' },
    { key: 'carwash', link: '/category/carwash' },
    { key: 'spray', link: '/category/spray' },
    { key: 'spare-parts', link: '/category/spare parts' },
    { key: 'tires', link: '/category/tires' },
    { key: 'accessorize', link: '/category/accessorize' },
    { key: 'showroom', link: '/category/showroom' },
    { key: 'maintenance', link: '/category/maintenance' },
    { key: 'oil-change', link: '/category/oil-change' },
    { key: 'battery', link: '/category/battery' },
    { key: 'air-conditioning', link: '/category/air-conditioning' },
    { key: 'diagnostics', link: '/category/diagnostics' },
    { key: 'car-polish', link: '/category/car-polish' },
    { key: 'detailing', link: '/category/detailing' },
    { key: 'insurance', link: '/category/insurance' },
    { key: 'roadside-assistance', link: '/category/roadside-assistance' },
    { key: 'car-rental', link: '/category/car-rental' },
];

const FeatureBar = () => {
    const { t } = useTranslation('common');
    return (
        <div className="footer-feature-bar">
        <div className="footer-feature-item">
            <div className="footer-feature-icon"><FiTruck /></div>
            <div>
            <div className="footer-feature-title">{t('fast-shpping')}</div>
            <div className="footer-feature-desc">{t('to-any-place')}</div>
            </div>
        </div>
        <div className="footer-feature-item">
            <div className="footer-feature-icon"><FiRefreshCw /></div>
            <div>
            <div className="footer-feature-title">{t('return')}</div>
            <div className="footer-feature-desc">{t('easy')}</div>
            </div>
        </div>
        <div className="footer-feature-item">
            <div className="footer-feature-icon"><FiShield /></div>
            <div>
            <div className="footer-feature-title">{t('customer-service')}</div>
            <div className="footer-feature-desc">{t('customer-service')}</div>
            </div>
        </div>
        </div>
    );
};

const Footer: React.FC = () => {
    const { t, i18n } = useTranslation('common');
    const isArabic = i18n.language === 'ar';
    return (
        <>
        <FeatureBar />
        <footer className="footer">
        <div className="footer__top">
            <div className="footer__col-group">
                <div className="footer__col">
                    <h4 className="footer__col-title">{t('quick_links')}</h4>
                    <ul className="footer__col-list">
                        <li><a href="/" className="footer__col-link">{t('nav_home')}</a></li>
                        <li><a href="/category/repair" className="footer__col-link">{t('repair')}</a></li>
                        <li><a href="/category/carwash" className="footer__col-link">{t('carwash')}</a></li>
                        <li><a href="/category/tires" className="footer__col-link">{t('tires')}</a></li>
                        <li><a href="/category/spare parts" className="footer__col-link">{t('spare-parts')}</a></li>
                        <li><a href="/category/showroom" className="footer__col-link">{t('showroom')}</a></li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4 className="footer__col-title">{t('services')}</h4>
                    <ul className="footer__col-list">
                        <li><a href="/category/repair" className="footer__col-link">{t('repair')}</a></li>
                        <li><a href="/category/carwash" className="footer__col-link">{t('carwash')}</a></li>
                        <li><a href="/category/spray" className="footer__col-link">{t('spray')}</a></li>
                        <li><a href="/category/spare parts" className="footer__col-link">{t('spare-parts')}</a></li>
                        <li><a href="/category/tires" className="footer__col-link">{t('tires')}</a></li>
                        <li><a href="/category/accessorize" className="footer__col-link">{t('accessorize')}</a></li>
                        <li><a href="/category/showroom" className="footer__col-link">{t('showroom')}</a></li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4 className="footer__col-title">{t('about-title')}</h4>
                    <ul className="footer__col-list">
                        <li><a href="/about" className="footer__col-link">{t('about-title')}</a></li>
                        <li><a href="/contact" className="footer__col-link">{t('about-contact-title')}</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer__contact-lang">
                <div className="footer__contact-block">
                    <FiMail className="footer__contact-icon" />
                    <div>
                        <div className="footer__contact-label">{t('about-contact-title')}</div>
                        <a href="mailto:support@emereld-marketing.online" className="footer__contact-email">support@emereld-marketing.online</a>
                    </div>
                </div>
                <div className="footer__lang-switcher">
                    <button
                        className={`footer__lang-btn${isArabic ? '' : ' active'}`}
                        onClick={() => i18n.changeLanguage('en')}
                        disabled={!isArabic}
                    >
                        English
                    </button>
                    <button
                        className={`footer__lang-btn${isArabic ? ' active' : ''}`}
                        onClick={() => i18n.changeLanguage('ar')}
                        disabled={isArabic}
                    >
                        العربية
                    </button>
                </div>
            </div>
        </div>
        <div className="footer__tags-bricks" dir={isArabic ? 'rtl' : 'ltr'}>
            {categories.map((cat) => (
                <span
                    key={cat.key}
                    className="footer__tag-brick"
                >
                    {t(cat.key)}
                </span>
            ))}
        </div>
        <div className="footer__bottom">
            <span>© {new Date().getFullYear()} <a href="https://emereld-marketing.online" style={{textDecoration:'none', color:'#38bdf8'}}>EMERELD</a>. All rights reserved.</span>
        </div>
        </footer>
        </>
    );
};

export default Footer;
