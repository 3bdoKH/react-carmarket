import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getServicesByCategory } from '../../lib/api';
import type { Service } from '../../types/service';
import ServiceCard from '../../components/services/ServiceCard';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCity, setSearchCity] = useState<string | undefined>(undefined);
    const { t, i18n } = useTranslation('common');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (mounted && category) {
            setLoading(true);
            getServicesByCategory(category)
                .then(data => {
                    if (mounted) {
                        // Filter to show only active services
                        const activeServices = data.filter(service => service.isActive);
                        setServices(activeServices);
                    }
                })
                .catch(err => {
                    console.error('Failed to fetch services:', err);
                    if (mounted) setServices([]);
                })
                .finally(() => {
                    if (mounted) setLoading(false);
                });
        }
    }, [category, mounted]);

    const handleSearch = (term: string, _cat?: string, city?: string) => {
        setSearchTerm(term);
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
            
            const cityMatch = searchCity
                ? service.city && service.city.toLowerCase().includes(searchCity.toLowerCase())
                : true;
            
            return (nameMatch || descMatch || tagsMatch) || cityMatch;
        });
    }, [services, searchTerm, searchCity]);

    if (!mounted || !category) {
        return null;
    }

    const isArabic = i18n.language === 'ar';
    const categoryTranslations: Record<string, string> = {
        'repair': t('repair'),
        'carwash': t('carwash'),
        'spray': t('spray'),
        'spare parts': t('spare-parts'),
        'tires': t('tires'),
        'accessorize': t('accessorize'),
        'showroom': t('showroom')
    };

    const categoryName = categoryTranslations[category] || '';
    const metaTitle = isArabic 
        ? `خدمات ${categoryName} | كار ماركت` 
        : `${categoryName} Services | Car Market`;
    const metaDescription = isArabic 
        ? `اكتشف أفضل خدمات ${categoryName} في منطقتك. احجز مع مقدمي خدمات موثوقين عبر كار ماركت.` 
        : `Explore the best ${categoryName} services in your area. Book trusted providers for ${categoryName} with Car Market.`;
    const metaOgImage = '/public/file.svg';
    const metaUrl = `https://yourdomain.com/category/${category}`;

    return (
        <div className="category-page-container">
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={metaUrl} />
                <meta property="og:image" content={metaOgImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={metaOgImage} />
                <meta httpEquiv="Content-Language" content={isArabic ? 'ar' : 'en'} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                '@context': 'https://schema.org',
                                '@type': 'CollectionPage',
                                'name': metaTitle,
                                'description': metaDescription,
                                'inLanguage': isArabic ? 'ar' : 'en',
                                'url': metaUrl
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'ItemList',
                                'name': metaTitle,
                                'itemListElement': filteredServices.map((service, idx) => ({
                                    '@type': 'ListItem',
                                    'position': idx + 1,
                                    'url': `https://yourdomain.com/service/${service._id}`,
                                    'name': service.name,
                                    'description': service.description
                                }))
                            }
                        ])
                    }}
                />
            </Helmet>

            <Header 
                onSearch={handleSearch} 
                search={true} 
                showCity={true}
                immediateSearch={false}
            />

            <main className="category-content">
                <h1 className="main-title">
                    {categoryName}
                    {filteredServices.length > 0 && (
                        <span className="services-count">
                            ({filteredServices.length} {t('services available')})
                        </span>
                    )}
                </h1>

                {loading ? (
                    <div className="loading-spinner">{t('loading')}</div>
                ) : filteredServices.length === 0 ? (
                    <div className="no-results">
                        <p>{t('no-services-found')}</p>
                        {(searchTerm || searchCity) && (
                            <button 
                                className="clear-filters"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSearchCity(undefined);
                                }}
                            >
                                {t('clear-filters')}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="services-grid">
                        {filteredServices.map(service => (
                            <ServiceCard 
                                key={service._id} 
                                service={service} 
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoryPage;