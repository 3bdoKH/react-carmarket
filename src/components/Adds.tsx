import React from 'react';
import './adds.css'
const adds = [
  {
    src: 'https://i.ibb.co/qYnZ9ZXq/T5c-Vg20506.webp',
    alt: 'عرض الزيت',
  },
  {
    src: 'https://i.ibb.co/CpZLdKyB/JJQe029208.webp',
    alt: 'عرض الكاوتش',
  },
  {
    src: 'https://i.ibb.co/rVLv3bP/cm-HJM20106.webp',
    alt: 'منتجات ومراكز صيانة عبور اوتو',
  },
  {
    src: 'https://i.ibb.co/RTP7NFTF/IWS8520206.webp',
    alt: 'عروض خاصة على بطاريات كلورايد جولد',
  },
  {
    src: 'https://i.ibb.co/9mhhFNR4/UPYf-U20206.webp',
    alt: 'عرض تجديد العربية دهان وسمكرة',
  }
];

const Adds = () => {
    return (
        <div className="adds-grid">
            <div className='grid-col-2'>
                <img src={adds[4].src} alt={adds[4].alt} className="adds-img" loading="lazy" />
            </div>
            <div className='grid-col-1'>
                <img src={adds[0].src} alt={adds[0].alt} className="adds-img" loading="lazy" />
                <img src={adds[1].src} alt={adds[1].alt} className="adds-img" loading="lazy" />
                <img src={adds[2].src} alt={adds[2].alt} className="adds-img" loading="lazy" />
                <img src={adds[3].src} alt={adds[3].alt} className="adds-img" loading="lazy" />
            </div>
        </div>
    );
};

export default Adds;
