import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BrandSlider.css'

const brandImages = [
  'FIAT.jpeg',
  'peugeot.jpeg',
  'subaru.jpeg',
  'minicooper.jpeg',
  'alpha.jpeg',
  'ford.jpeg',
  'seat.jpeg',
  'Suzuki.jpeg',
  'ds.jpeg',
  'cetroen.jpeg',
  'volkswagen.jpeg',
  'Nissan.jpeg',
  'chevrolet.jpeg',
  'Opel.jpeg',
  'skoda.jpeg',
  'Jeep.jpeg',
  'Jetour.jpeg',
  'audi.jpeg',
  'bmw.jpeg',
  'mercedes.jpeg',
  'Changan.jpeg',
  'renault.jpeg',
  'mitsubishi.jpeg',
  'mg.jpeg',
  'mazda.jpeg',
  'hyundai.jpeg',
  'honda.jpeg',
  'Toyota.jpeg',
  'byd.jpeg',
  'kia.jpeg'
];


const BrandSlider: React.FC = () => {

  return (
    <section style={{
      maxWidth: '1100px',
      margin: '3rem auto',
      padding: '2rem',
      background: '#0070f3',
      boxShadow: '0 2px 12px #0001',
      textAlign: 'center',
      borderRadius:'10px'
    }}>
      <div style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'white', textAlign:'left',}}>POPULAR BRANDS</div>
      <p style={{textAlign:'left', fontSize:'12px', color:'white', marginBottom:'30px'}}>BASED ON USERS ORDERS</p>

      <Slider
        dots={false}
        infinite={true}
        speed={700}
        slidesToShow={5}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={1800}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 4 } },
          { breakpoint: 600, settings: { slidesToShow: 2 } },
        ]}
      >
        {brandImages.map((partner, idx) => (
          <div key={idx} style={{padding: '0 10px'}}>
            <img
              src={`/images/brands/${partner}`}
              alt={partner.replace('.jpeg', '')}
              style={{
                width: '100%',
                maxWidth: '120px',
                height: '80px',
                objectFit: 'contain',
                margin: '0 auto',
                filter: 'drop-shadow(0 2px 8px #0002)',
                background: 'white',
                borderRadius: '0.5rem',
                padding: '0.5rem',
              }}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default BrandSlider; 