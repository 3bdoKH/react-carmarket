import React, { useEffect, useState } from 'react';
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
    }, []);

    useEffect(() => {
        if (mounted && category && typeof category === 'string') {
            setLoading(true);
            getServicesByCategory(category)
                .then(setServices)
                .catch((err) => {
                    setServices([]);
                    console.error('Failed to fetch services:', err);
                })
                .finally(() => setLoading(false));
        }
    }, [category, mounted]);

    const handleSearch = (term: string, _cat?: string, city?: string) => {
        setSearchTerm(term);
        setSearchCity(city);
    };

    const filteredServices = services.filter(service => {
        const matchesTerm = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = searchCity && searchCity.trim() !== ''
            ? (service.city && service.city.toLowerCase().includes(searchCity.toLowerCase()))
            : true;
        return matchesTerm && matchesCity;
    });

    if (!mounted || !category || typeof category !== 'string') {
        return null;
    }

    const isArabic = i18n.language === 'ar';
    const categoryName = category === 'repair' ? t('repair') : category === 'carwash' ? t('carwash') : category === 'spray' ? t('spray') : category === 'spare parts' ? t('spare-parts') : category === 'tires' ? t('tires') : category === 'accessorize' ? t('accessorize') : category === 'showroom' ? t('showroom') : '';
    const metaTitle = isArabic ? `خدمات ${categoryName} | كار ماركت` : `${categoryName} Services | Car Market`;
    const metaDescription = isArabic ? `اكتشف أفضل خدمات ${categoryName} في منطقتك. احجز مع مقدمي خدمات موثوقين عبر كار ماركت.` : `Explore the best ${categoryName} services in your area. Book trusted providers for ${categoryName} with Car Market.`;
    const metaOgImage = '/public/file.svg';
    const metaUrl = `https://yourdomain.com/category/${category}`;

    return (
        <div className="home-container">
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
            <Header onSearch={handleSearch} search={true} showCity={true}/>
            <h1 className="main-title">
                {
                    category === 'repair' ? t('repair') : category === 'carwash' ? t('carwash') : category === 'spray' ? t('spray') : category === 'spare parts' ? t('spare-parts') : category === 'tires' ? t('tires') : category === 'accessorize' ? t('accessorize') : category === 'showroom' ? t('showroom') : ""
                } 
            </h1>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : filteredServices.length === 0 ? (
                <div className="loading">No services found in this category.</div>
            ) : (
                <div className="services-grid">
                {filteredServices.map(service => (
                    <ServiceCard key={service._id} service={service} />
                ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CategoryPage;
