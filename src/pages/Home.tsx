import { useState, useEffect, useMemo } from 'react';
import { getServices } from '../lib/api';
import type { Service, ServiceCategory } from '../types/service';
import { getRandomItems } from '../lib/random';
import ServiceCard from '../components/services/ServiceCard';
import Header from '../components/header/Header';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer/Footer';
import BrandSlider from '../components/BrandSlider';
import BestCategories from '../components/BestCategories';
import CarServicesArea from '../components/CarServicesArea';
import Adds from '../components/Adds';
import SponsorSlider from '../components/SponsorSlider';
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
        
        if (!searchTerm && !searchCategory && !searchCity) {
            return randomServicesByCategory;
        }
    
        Object.entries(servicesByCategory).forEach(([category, services]) => {
    
            if (searchCategory && category !== searchCategory) {
                return;
            }
    
            const filtered = services.filter(service => {
                const nameMatch = searchTerm 
                    ? service.name.toLowerCase().includes(searchTerm.toLowerCase())
                    : true;
                
                const descMatch = searchTerm && service.description
                    ? service.description.toLowerCase().includes(searchTerm.toLowerCase())
                    : false;
                
                const tagsMatch = searchTerm && service.servicesOffered
                    ? service.servicesOffered.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
                    : false;
                
                const cityMatch = searchCity
                    ? service.city && service.city.toLowerCase().includes(searchCity.toLowerCase())
                    : true;
                
                const shouldInclude = (nameMatch || descMatch || tagsMatch) || cityMatch;
                return shouldInclude;
            });
    
            if (filtered.length > 0) {
                result[category] = filtered;
            } else {
                console.log(`No matching services in category ${category}`);
            }
        });
        return result;
    }, [servicesByCategory, searchTerm, searchCategory, searchCity, randomServicesByCategory]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allServices = await getServices();
                const grouped = allServices.reduce((acc, service) => {
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
            <Header onSearch={handleSearch} search={true} showCity={true} immediateSearch={true} />
            
            <section className="hero-section-with-image">
                <div className="hero-text-content">
                    <h1 className="website-title" style={{
                        fontSize: '2.8rem',
                        fontWeight: 'bold',
                        color: '#0070f3',
                        textShadow: '2px 2px 8px #b3d1ff',
                        marginBottom: '0.5em',
                        letterSpacing: '2px',
                        fontFamily: 'Segoe UI, Arial, sans-serif',
                    }}>
                        <a href="https://fontmeme.com/signature-fonts/"><img src="https://fontmeme.com/permalink/250722/3f0ce8500e16126e79728b4e587fb206.png" alt="signature-fonts" /></a>
                        <a href="https://fontmeme.com/signature-fonts/"><img src="https://fontmeme.com/permalink/250722/4002f5bb557b1f31966ff4192d5a44d8.png" alt="signature-fonts" /></a>
                    </h1>
                    <h1 className="hero-title">{t('hero-title')}</h1>
                    <p className="hero-desc">{t('hero-desc')}</p>
                    <a href="#categories" className="hero-cta">{t('hero-cta')}</a>
                </div>
                <div className="hero-image-wrapper">
                    <div className="hero-image-bg"></div>
                    <img
                        src={heroImages[currentHeroIndex]}
                        alt="Hero Car"
                        className={`hero-image ${fade ? "fade-in" : "fade-out"}`}
                        key={heroImages[currentHeroIndex]} 
                    />
                </div>
            </section>

            <div style={{ textAlign: 'center', margin: '5rem auto 1rem auto', fontWeight: 'bold', fontSize: '1.3rem'}} className='sponser-title'>
                {t('sponsor-slider-phrase')}
            </div>
            <SponsorSlider />
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