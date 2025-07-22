import { useState, useEffect, useMemo } from 'react';
import { getServices } from '../lib/api';
import type { Service, ServiceCategory } from '../types/service';
import ServiceCard from '../components/services/ServiceCard';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useTranslation } from 'react-i18next';
import '../styles/services.css';

const ServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState<ServiceCategory | undefined>(undefined);
    const [searchCity, setSearchCity] = useState<string | undefined>(undefined);
    const { t, i18n } = useTranslation('common');
    const isArabic = i18n.language === 'ar';
    // const metaTitle = isArabic ? 'كل الخدمات | كار ماركت' : 'All Services | Car Market';
    // const metaDescription = isArabic ? 'تصفح جميع خدمات السيارات مع إمكانية التصفية حسب الفئة والبحث بالمدينة.' : 'Browse all car services with category filter and city search.';
    // const metaOgImage = '/public/file.svg';
    // const metaUrl = 'https://carmarket-eg.online/services';

    useEffect(() => {
        const fetchData = async () => {
        try {
            const allServices = await getServices();
            setServices(allServices);
        } catch (error) {
            setServices([]);
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    const handleSearch = (term: string, category?: ServiceCategory, city?: string) => {
        setSearchTerm(term);
        setSearchCategory(category);
        setSearchCity(city);
    };

    const filteredServices = useMemo(() => {
        return services.filter(service => {
        const matchesTerm = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = searchCategory ? service.category === searchCategory : true;
        const matchesCity = searchCity && searchCity.trim() !== ''
            ? (service.city && service.city.toLowerCase().includes(searchCity.toLowerCase()))
            : true;
        return matchesTerm && matchesCategory && matchesCity;
        });
    }, [services, searchTerm, searchCategory, searchCity]);

    return (
        <div className="services-page-container">
        {/* Meta tags can be handled with react-helmet-async or manually in index.html */}
        <Header onSearch={handleSearch} search={true} showCity={true} />
        <h1 className="services-main-title">{t('all-services')}</h1>
        <div className="services-searchbar-wrapper">
        </div>
        {loading ? (
            <div className="services-loading">{t('loading')}</div>
        ) : filteredServices.length === 0 ? (
            <div className="services-no-results">{t('no-services-found')}</div>
        ) : (
            <div className="all-services-grid">
            {filteredServices.map(service => (
                <ServiceCard key={service._id} service={service} />
            ))}
            </div>
        )}
        <Footer />
        </div>
    );
}

export default ServicesPage; 