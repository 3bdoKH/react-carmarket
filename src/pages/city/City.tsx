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
                    setServices(all.filter(s => s.city && s.city.toLowerCase() === city.toLowerCase()));
                })
                .catch(() => setServices([]))
                .finally(() => setLoading(false));
        }
    }, [city]);

    const isArabic = i18n.language === 'ar';
    const metaTitle = isArabic ? `خدمات السيارات في ${city}` : `Car Services in ${city}`;
    const metaDescription = isArabic ? `اكتشف أفضل خدمات السيارات في ${city}. احجز مع مقدمي خدمات موثوقين عبر كار ماركت.` : `Find the best car services in ${city}. Book trusted providers with Car Market.`;
    const metaOgImage = '/public/file.svg';
    const metaUrl = `https://carmarket-eg.online/city/${city}`;

    return (
        <div className="city-page-container">
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={metaOgImage} />
                <meta property="og:url" content={metaUrl} />
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