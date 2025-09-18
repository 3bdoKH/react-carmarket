import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServices } from '../../lib/api';
import type { Service } from '../../types/service';
import ServiceCard from '../../components/services/ServiceCard';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const CityServicesPage = () => {
    const { city } = useParams<{ city: string }>();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();

    useEffect(() => {
        if (city && typeof city === 'string') {
            setLoading(true);
            getServices()
                .then(all => {
                    // Filter to show only active services in the city
                    const activeServicesInCity = all.filter(s => 
                        s.isActive && s.city && s.city.toLowerCase() === city.toLowerCase()
                    );
                    setServices(activeServicesInCity);
                })
                .catch(() => setServices([]))
                .finally(() => setLoading(false));
        }
    }, [city]);

    const isArabic = i18n.language === 'ar';
    const metaTitle = isArabic ? `خدمات السيارات في ${city}` : `Car Services in ${city}`;
    const metaDescription = isArabic ? `اكتشف أفضل خدمات السيارات في ${city}. احجز مع مقدمي خدمات موثوقين عبر كار ماركت.` : `Find the best car services in ${city}. Book trusted providers with Car Market.`;
    const metaOgImage = 'https://carmarket-eg.online/images/og-image.jpg';
    const metaUrl = `https://carmarket-eg.online/city/${city}`;

    return (
        <div className="city-page-container">
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`خدمات السيارات ${city}, صيانة السيارات ${city}, مراكز الصيانة ${city}, غسيل السيارات ${city}, رش السيارات ${city}, car services ${city}, car repair ${city}`} />
                <meta name="robots" content="index, follow" />
                <meta name="geo.region" content="EG" />
                <meta name="geo.country" content="Egypt" />
                <meta name="geo.placename" content={city} />
                <meta httpEquiv="Content-Language" content={isArabic ? 'ar' : 'en'} />
                <link rel="canonical" href={metaUrl} />
                
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={metaOgImage} />
                <meta property="og:url" content={metaUrl} />
                <meta property="og:locale" content={isArabic ? 'ar_EG' : 'en_US'} />
                <meta property="og:locale:alternate" content={isArabic ? 'en_US' : 'ar_EG'} />
                <meta property="og:site_name" content="Car Market Egypt" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={metaOgImage} />
                
                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'CollectionPage',
                            name: metaTitle,
                            description: metaDescription,
                            url: metaUrl,
                            inLanguage: isArabic ? 'ar' : 'en',
                            mainEntity: {
                                '@type': 'ItemList',
                                name: metaTitle,
                                description: isArabic ? `قائمة بأفضل مراكز خدمات السيارات في ${city}` : `List of best car service centers in ${city}`,
                                numberOfItems: services.length,
                                itemListOrder: 'https://schema.org/ItemListOrderAscending',
                                itemListElement: services.map((service, index) => ({
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
                                        serviceType: service.category,
                                        priceRange: '$$',
                                       
                                    }
                                }))
                            },
                            breadcrumb: {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    {
                                        '@type': 'ListItem',
                                        position: 1,
                                        name: isArabic ? 'الرئيسية' : 'Home',
                                        item: 'https://carmarket-eg.online'
                                    },
                                    {
                                        '@type': 'ListItem',
                                        position: 2,
                                        name: isArabic ? `خدمات السيارات في ${city}` : `Car Services in ${city}`,
                                        item: metaUrl
                                    }
                                ]
                            }
                        })
                    }}
                />
            </Helmet>
            <Header onSearch={() => {}} search={true} showCity={false} />
            {
                localStorage.getItem('lang') === 'ar' ? 
                <h1 className="city-main-title">خدمات السيارات في {city}</h1> :
                <h1 className="city-main-title">Car Services In {
                    city === 'القاهرة' ? 'Cairo' : city === 'الجيزة' ? 'Giza' : 'Alexanderia'
                }</h1>
            }
            {loading ? (
                <div className="city-loading">Loading...</div>
            ) : services.length === 0 ? (
                <div className="city-no-services">No services found in this city.</div>
            ) : (
                <div className="city-services-grid">
                    {services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CityServicesPage;