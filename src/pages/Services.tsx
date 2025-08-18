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
    const { t } = useTranslation('common');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allServices = await getServices();
                // Filter to show only active services
                const activeServices = allServices.filter(service => service.isActive);
                setServices(activeServices);
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
            const nameMatch = searchTerm 
                ? service.name.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            
            const descMatch = searchTerm && service.description
                ? service.description.toLowerCase().includes(searchTerm.toLowerCase())
                : false;
            
            const tagsMatch = searchTerm && service.servicesOffered
                ? service.servicesOffered.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
                : false;
            
            const categoryMatch = searchCategory
                ? service.category === searchCategory
                : true;
            
            const cityMatch = searchCity
                ? service.city && service.city.toLowerCase().includes(searchCity.toLowerCase())
                : true;
            return (nameMatch || descMatch || tagsMatch || cityMatch) && categoryMatch;
        });
    }, [services, searchTerm, searchCategory, searchCity]);

    return (
        <div className="services-page-container">
            <Header 
                onSearch={handleSearch} 
                search={true} 
                showCity={true} 
                immediateSearch={false}  // Enable immediate search as you type
            />
            
            <h1 className="services-main-title">
                {searchTerm || searchCategory || searchCity 
                    ? t('search-results') 
                    : t('all-services')}
            </h1>
            
            <div className="services-searchbar-wrapper">
                {/* You can add additional search controls here if needed */}
            </div>
            
            {loading ? (
                <div className="services-loading">{t('loading')}</div>
            ) : filteredServices.length === 0 ? (
                <div className="services-no-results">
                    {t('no-services-found')}
                    {(searchTerm || searchCity) && (
                        <p className="search-suggestions">
                            Try different search terms or broaden your filters
                        </p>
                    )}
                </div>
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