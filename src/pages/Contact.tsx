import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SEO from '../components/seo/SEO';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/contact.css';

const Contact = () => {
  const { t } = useTranslation('common');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      alert('Thank you for contacting us!');
      setForm({ name: '', email: '', message: '' });
    } else {
      alert('There was an error. Please try again later.');
    }
  };
  // SEO structured data for contact page
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('seo.contact-title'),
    description: t('seo.contact-description'),
    url: 'https://carmarket-eg.online/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Car Market Egypt',
      alternateName: 'كار ماركت',
      url: 'https://carmarket-eg.online',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+20-109-5016685',
          contactType: 'customer service',
          availableLanguage: ['Arabic', 'English'],
          areaServed: 'EG'
        },
        {
          '@type': 'ContactPoint',
          email: 'support@emereld-marketing.online',
          contactType: 'customer service',
          availableLanguage: ['Arabic', 'English'],
          areaServed: 'EG'
        }
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EG'
      }
    }
  };

  return (
    <>
      <SEO
        title={t('seo.contact-title')}
        description={t('seo.contact-description')}
        keywords={t('seo.contact-keywords', { returnObjects: true }) as string[]}
        url="https://carmarket-eg.online/contact"
        type="website"
        structuredData={contactStructuredData}
        alternateUrls={{
          'ar': 'https://carmarket-eg.online/contact?lang=ar',
          'en': 'https://carmarket-eg.online/contact?lang=en',
          'x-default': 'https://carmarket-eg.online/contact'
        }}
      />
      <Header onSearch={() => { }} search={false} />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-info">
          <p className="contact-detail"><FaPhone style={{ marginRight: '8px' }} />Contact Number: <a href="tel:01034016811">01034016811</a></p>
          <p className="contact-detail"><FaWhatsapp style={{ marginRight: '8px', color: '#25D366' }} />WhatsApp: <a href="https://wa.me/201034016811" target="_blank" rel="noopener noreferrer">01034016811</a></p>
          <p className="contact-detail"><FaEnvelope style={{ marginRight: '8px', }} /> : <a href="mailto:support@emereld-marketing.online" style={{ fontSize: '15px' }}>support@adams-agency.online</a></p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label htmlFor="name" className="contact-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="contact-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>
          <div>
            <label htmlFor="message" className="contact-label">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="contact-textarea"
            />
          </div>
          <button type="submit" className="button">Send Message</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact; 