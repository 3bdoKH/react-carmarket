import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SEO from '../components/seo/SEO';
import { useTranslation } from 'react-i18next';
import '../styles/about.css';

const About = () => {
  const { t, i18n } = useTranslation('common');
  const isArabic = i18n.language === 'ar';
  
  // SEO structured data for about page
  const aboutStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t('seo.about-title'),
    description: t('seo.about-description'),
    url: 'https://carmarket-eg.online/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Car Market Egypt',
      alternateName: 'كار ماركت',
      url: 'https://carmarket-eg.online',
      logo: 'https://carmarket-eg.online/images/logo.png',
      description: t('seo.about-description'),
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EG'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@emereld-marketing.online',
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'English']
      },
      areaServed: 'Egypt',
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
      ]
    }
  };

  return (
    <>
      <SEO 
        title={t('seo.about-title')}
        description={t('seo.about-description')}
        keywords={t('seo.about-keywords', { returnObjects: true }) as string[]}
        url="https://carmarket-eg.online/about"
        type="website"
        structuredData={aboutStructuredData}
        alternateUrls={{
          'ar': 'https://carmarket-eg.online/about?lang=ar',
          'en': 'https://carmarket-eg.online/about?lang=en',
          'x-default': 'https://carmarket-eg.online/about'
        }}
      />
      <Header onSearch={() => {}} search={false} />
      <div className="about-bg">
        <div className="about-container">
          <h1>عن كار ماركت</h1>
          <div className="about-section">
            <h2>من نحن؟</h2>
            <p>
              كار ماركت هو موقع إلكتروني يهدف إلى تسهيل عملية البحث عن خدمات السيارات في مصر، من صيانة، غسيل، رش، قطع غيار، إطارات، إكسسوارات، ومعارض سيارات. نحن نؤمن بأن توفير المعلومات الصحيحة والمحدثة يساعد المستخدمين في اتخاذ قرارات أفضل.
            </p>
          </div>
          <div className="about-section">
            <h2>رؤيتنا</h2>
            <p>
              أن نكون المنصة الأولى في مصر التي تجمع كل خدمات السيارات في مكان واحد، مع التركيز على الجودة، الشفافية، وسهولة الاستخدام.
            </p>
          </div>
          <div className="about-section">
            <h2>لماذا كار ماركت؟</h2>
            <p>
              - قاعدة بيانات ضخمة ومحدثة.<br />
              - إمكانية البحث والتصفية حسب المدينة أو الفئة.<br />
              - تقييمات ومراجعات حقيقية من المستخدمين.<br />
              - دعم فني سريع وفعال.
            </p>
          </div>
          <div className="about-section">
            <h2>تواصل معنا</h2>
            <p>
              لأي استفسار أو اقتراح، يمكنك التواصل معنا عبر البريد الإلكتروني: <a href="mailto:info@carmarket-eg.online">info@carmarket-eg.online</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About; 