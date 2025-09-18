import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  structuredData?: Record<string, unknown>;
  canonical?: string;
  noindex?: boolean;
  locale?: string;
  alternateUrls?: { [key: string]: string };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url = 'https://carmarket-eg.online',
  type = 'website',
  structuredData,
  canonical,
  noindex = false,
  locale,
  alternateUrls = {}
}) => {
  const { i18n } = useTranslation('common');
  const isArabic = i18n.language === 'ar';
  
  // Default SEO values based on language
  const defaultTitle = isArabic 
    ? 'كار ماركت - أفضل خدمات السيارات في مصر'
    : 'Car Market Egypt - Best Car Services in Egypt';
    
  const defaultDescription = isArabic
    ? 'اكتشف أفضل مراكز صيانة وإصلاح السيارات في مصر. خدمات غسيل، رش، قطع غيار، إطارات واكسسوارات بأفضل الأسعار عبر كار ماركت'
    : 'Discover the best car service centers in Egypt. Car wash, paint, spare parts, tires and accessories services at the best prices through Car Market';

  const defaultKeywords = isArabic
    ? ['خدمات السيارات مصر', 'صيانة السيارات', 'إصلاح السيارات', 'غسيل السيارات', 'رش السيارات', 'قطع غيار', 'إطارات', 'اكسسوارات السيارات', 'مراكز الصيانة مصر', 'كار ماركت']
    : ['car services egypt', 'car maintenance', 'car repair', 'car wash', 'car paint', 'spare parts', 'tires', 'car accessories', 'service centers egypt', 'car market'];

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords.length > 0 ? keywords : defaultKeywords;
  const finalImage = image.startsWith('http') ? image : `https://carmarket-eg.online${image}`;
  const finalLocale = locale || (isArabic ? 'ar_EG' : 'en_US');
  const finalCanonical = canonical || url;

  // Generate robots content
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';

  // Default structured data for the business
  const defaultStructuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Car Market Egypt',
    alternateName: 'كار ماركت',
    description: finalDescription,
    url: 'https://carmarket-eg.online',
    logo: 'https://carmarket-eg.online/images/logo.png',
    image: finalImage,
    telephone: '+201034016811',
    email: 'info@emereld-marketing.online',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'Egypt'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.8206,
      longitude: 30.8025
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt'
    },
    serviceType: isArabic ? [
      'صيانة السيارات',
      'إصلاح السيارات', 
      'غسيل السيارات',
      'رش السيارات',
      'قطع غيار السيارات',
      'إطارات السيارات',
      'اكسسوارات السيارات'
    ] : [
      'Car Maintenance',
      'Car Repair',
      'Car Wash',
      'Car Paint',
      'Car Spare Parts',
      'Car Tires',
      'Car Accessories'
    ],
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card',
    currenciesAccepted: 'EGP',
    openingHours: 'Mo-Su 09:00-18:00'
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="robots" content={robotsContent} />
      <meta name="language" content={isArabic ? 'Arabic' : 'English'} />
      <meta name="geo.region" content="EG" />
      <meta name="geo.country" content="Egypt" />
      <meta name="geo.placename" content="Egypt" />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content={finalLocale} />
      <meta property="og:locale:alternate" content={isArabic ? 'en_US' : 'ar_EG'} />
      <meta property="og:site_name" content="Car Market Egypt" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />

      {/* Alternate Language URLs */}
      {Object.entries(alternateUrls).map(([lang, altUrl]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={altUrl} />
      ))}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />

      {/* Set document direction and language dynamically */}
      <html lang={isArabic ? 'ar' : 'en'} dir={isArabic ? 'rtl' : 'ltr'} />
    </Helmet>
  );
};

export default SEO;