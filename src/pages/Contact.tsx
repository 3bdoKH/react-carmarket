import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/contact.css';

const Contact = () => {
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
  return (
    <>
      <Header onSearch={() => {}} search={false} />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-info">
            <p className="contact-detail"><FaPhone style={{marginRight: '8px'}} />Contact Number: <a href="tel:01095016685">01095016685</a></p>
            <p className="contact-detail"><FaWhatsapp style={{marginRight: '8px', color: '#25D366'}} />WhatsApp: <a href="https://wa.me/201095016685" target="_blank" rel="noopener noreferrer">01095016685</a></p>
            <p className="contact-detail"><FaEnvelope style={{marginRight: '8px',}} /> : <a href="mailto:support@emereld-marketing.online" style={{fontSize:'15px'}}>support@emereld-marketing.online</a></p>
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