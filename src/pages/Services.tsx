import { useState, useEffect, useMemo } from 'react';
import { getServices } from '../lib/api';
import type { Service, ServiceCategory } from '../types/service';
import ServiceCard from '../components/services/ServiceCard';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useTranslation } from 'react-i18next';
import SEO from '../components/seo/SEO';
import '../styles/services.css';

const ServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState<ServiceCategory | undefined>(undefined);
    const [searchCity, setSearchCity] = useState<string | undefined>(undefined);
    const { t} = useTranslation('common');

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

    
    // SEO structured data for services page
    const servicesStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('seo.services-title'),
        description: t('seo.services-description'),
        url: 'https://carmarket-eg.online/services',
        mainEntity: {
            '@type': 'ItemList',
            name: t('seo.services-title'),
            numberOfItems: filteredServices.length,
            itemListElement: filteredServices.slice(0, 10).map((service, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'LocalBusiness',
                    name: service.name,
                    description: service.description,
                    url: `https://carmarket-eg.online/service/${service._id}`,
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: service.city,
                        addressCountry: 'EG'
                    },
                    category: service.category
                }
            }))
        }
    };

    return (
        <div className="services-page-container">
            <SEO 
                title={t('seo.services-title')}
                description={t('seo.services-description')}
                keywords={t('seo.services-keywords', { returnObjects: true }) as string[]}
                url="https://carmarket-eg.online/services"
                type="website"
                structuredData={servicesStructuredData}
                alternateUrls={{
                    'ar': 'https://carmarket-eg.online/services?lang=ar',
                    'en': 'https://carmarket-eg.online/services?lang=en',
                    'x-default': 'https://carmarket-eg.online/services'
                }}
            />
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