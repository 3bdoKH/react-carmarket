import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/about.css';

const About = () => {
  return (
    <>
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