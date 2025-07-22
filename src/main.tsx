import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/services.css';
import './styles/blog.css';
import './styles/about.css';
import './styles/category.css';
import './styles/contact.css';
import './styles/serviceDetails.css';
import './styles/city.css';
import './styles/led.css';
import './styles/globals.css';
import './lib/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
