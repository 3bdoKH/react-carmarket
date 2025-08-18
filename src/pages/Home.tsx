import { useState, useEffect, useMemo } from 'react';
import { getServices } from '../lib/api';
import type { Service, ServiceCategory } from '../types/service';
import { getRandomItems } from '../lib/random';
import { performCompleteSearch } from '../lib/searchUtils';
import ServiceCard from '../components/services/ServiceCard';
import Header from '../components/header/Header';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer/Footer';
import BrandSlider from '../components/BrandSlider';
import BestCategories from '../components/BestCategories';
import CarServicesArea from '../components/CarServicesArea';
import Adds from '../components/Adds';
import SponsorSlider from '../components/SponsorSlider';
import AdvertisedServices from '../components/AdvertisedServices';
import '../styles/index.css';

const Home = () => {
    const [servicesByCategory, setServicesByCategory] = useState<Partial<Record<ServiceCategory, Service[]>>>({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState<ServiceCategory | undefined>(undefined);
    const [searchCity, setSearchCity] = useState<string | undefined>(undefined);
    const { t } = useTranslation('common');
    
    const handleSearch = (term: string, category?: ServiceCategory, city?: string) => {
        setSearchTerm(term);
        setSearchCategory(category);
        setSearchCity(city);
    };

    const heroImages = [
        "/images/car-1.png",
        "/images/car-2.png",
        "/images/car-3.png",
        "/images/car-4.png",
        "/images/car-5.webp",
        "/images/car-6.png",
        "/images/car-7.png",
        "/images/car-8.png",
        "/images/car-9.png",
    ];
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [randomServicesByCategory, setRandomServicesByCategory] = useState<Record<string, Service[]>>({});

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); 
            setTimeout(() => {
                setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
                setFade(true); 
            }, 500); 
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const filteredServicesByCategory = useMemo(() => {    
        const result: Record<string, Service[]> = {};
        
        // If no search criteria, return random services
        if (!searchTerm && !searchCategory && !searchCity) {
            return randomServicesByCategory;
        }
        
        // Flatten services for searching
        const allServices: Service[] = [];
        Object.values(servicesByCategory).forEach(services => {
            allServices.push(...services);
        });
        
        // Use Fuse.js for fuzzy search with Arabic support
        const searchResults = performCompleteSearch(
            searchTerm,
            allServices,
            searchCategory,
            searchCity
        );
        
        // Group results back by category
        searchResults.forEach(service => {
            const category = service.category;
            if (!result[category]) {
                result[category] = [];
            }
            result[category].push(service);
        });
        
        return result;
    }, [servicesByCategory, searchTerm, searchCategory, searchCity, randomServicesByCategory]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allServices = await getServices();
                // Filter to show only active services
                const activeServices = allServices.filter(service => service.isActive);
                const grouped = activeServices.reduce((acc, service) => {
                    acc[service.category] = acc[service.category] || [];
                    acc[service.category].push(service);
                    return acc;
                }, {} as Record<ServiceCategory, Service[]>);
                
                setServicesByCategory(grouped);
                const randoms: Record<string, Service[]> = {};
                Object.entries(grouped).forEach(([cat, services]) => {
                    randoms[cat] = getRandomItems(services, 4);
                });
                setRandomServicesByCategory(randoms);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="home-container">
            <Header onSearch={handleSearch} search={true} showCity={false} immediateSearch={false} searchT={true} />
            
            <section className="hero-section-modern">
                {/* Background decorative elements */}
                <div className="hero-bg-decoration">
                    <div className="hero-bg-circle hero-bg-circle-1"></div>
                    <div className="hero-bg-circle hero-bg-circle-2"></div>
                    <div className="hero-bg-circle hero-bg-circle-3"></div>
                    <div className="hero-bg-grid"></div>
                </div>

                <div className="hero-content-wrapper">
                    <div className="hero-text-section">
                        {/* Badge */}
                        <div className="hero-badge">
                            <span className="hero-badge-icon">🚗</span>
                            <span className="hero-badge-text">{t('hero-badge-text', 'Premium Car Services')}</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="hero-main-title">
                            <span className="hero-title-line-1">{t('hero-title-line-1', 'Find Your Perfect')}</span>
                            <span className="hero-title-line-2">
                                <span className="hero-title-highlight">{t('hero-title-highlight', 'Car Service')}</span>
                                <span className="hero-title-suffix">{t('hero-title-suffix', 'Partner')}</span>
                            </span>
                    </h1>

                        {/* Description */}
                        <p className="hero-description">
                            {t('hero-desc', 'Discover top-rated car services, repairs, and maintenance from trusted professionals in your area. Quality guaranteed, prices you can trust.')}
                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-cta-group">
                            <a href="#categories" className="hero-cta-primary">
                                <span className="hero-cta-text">{t('hero-cta', 'Explore Services')}</span>
                                <span className="hero-cta-icon">→</span>
                            </a>
                            <a href="/services" className="hero-cta-secondary">
                                <span className="hero-cta-text">{t('hero-cta-secondary', 'View All')}</span>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            <div className="hero-stat-item">
                                <span className="hero-stat-number">500+</span>
                                <span className="hero-stat-label">{t('hero-stat-services', 'Services')}</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat-item">
                                <span className="hero-stat-number">50+</span>
                                <span className="hero-stat-label">{t('hero-stat-cities', 'Cities')}</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat-item">
                                <span className="hero-stat-number">10k+</span>
                                <span className="hero-stat-label">{t('hero-stat-customers', 'Happy Customers')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual-section">
                        {/* Floating elements */}
                        <div className="hero-floating-elements">
                            <div className="hero-floating-card hero-floating-card-1">
                                <div className="hero-floating-icon">⭐</div>
                                <span className="hero-floating-text">{t('hero-floating-1', '5-Star Rated')}</span>
                            </div>
                            <div className="hero-floating-card hero-floating-card-2">
                                <div className="hero-floating-icon">⚡</div>
                                <span className="hero-floating-text">{t('hero-floating-2', 'Fast Service')}</span>
                            </div>
                            <div className="hero-floating-card hero-floating-card-3">
                                <div className="hero-floating-icon">💰</div>
                                <span className="hero-floating-text">{t('hero-floating-3', 'Best Prices')}</span>
                            </div>
                        </div>

                        {/* Main image container */}
                        <div className="hero-image-container">
                            <div className="hero-image-background">
                                <div className="hero-image-bg-gradient"></div>
                                <div className="hero-image-bg-pattern"></div>
                </div>
                <div className="hero-image-wrapper">
                    <img
                        src={heroImages[currentHeroIndex]}
                                    alt="Premium Car Service"
                                    className={`hero-main-image ${fade ? "fade-in" : "fade-out"}`}
                        key={heroImages[currentHeroIndex]} 
                    />
                                <div className="hero-image-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ textAlign: 'center', margin: '5rem auto 1rem auto', fontWeight: 'bold', fontSize: '1.3rem'}} className='sponser-title'>
                {t('sponsor-slider-phrase')}
            </div>
            <SponsorSlider />
            <AdvertisedServices 
                maxServices={6} 
                title={ 'Featured Services'} 
                subtitle={ 'Discover our top recommended sponsored services'} 
            />
            <BestCategories />
            <BrandSlider />
            <CarServicesArea />
            <Adds />

            <h1 className="main-title">
                {searchTerm || searchCategory || searchCity 
                    ? t('search-results') 
                    : t('main-title')}
            </h1>
            
            {Object.entries(filteredServicesByCategory).length === 0 ? (
                <div className="loading">{t('no-services-found')}</div>
            ) : (
                Object.entries(filteredServicesByCategory).map(([category, services]) => (
                    <section key={category} className="category-section" id='categories'>
                        <div className="category-header">
                            <h2 className="category-title">
                                {category === 'repair' ? t('repair') : 
                                    category === 'carwash' ? t('carwash') : 
                                    category === 'spray' ? t('spray') : 
                                    category === 'spare parts' ? t('spare-parts') : 
                                    category === 'tires' ? t('tires') : 
                                    category === 'accessorize' ? t('accessorize') : 
                                    category === 'showroom' ? t('showroom') : ""}
                            </h2>
                            <a 
                                href={`/category/${category}`} 
                                className="button"
                                style={{ textDecoration: 'none' }}
                            >
                                {t('category-button')}
                            </a>
                        </div>
                        
                        <div className="services-grid">
                            {services.map((service) => (
                                <ServiceCard key={service._id} service={service} />
                            ))}
                        </div>
                    </section>
                ))
            )}
            <Footer />
        </div>
    );
}

export default Home;