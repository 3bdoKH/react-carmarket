import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './sponsorSlider.css'
const sponsors = [
    {
        name: 'Winch Enqaz',
        image: '/images/winch.png',
        link: 'https://winchenqaz.com/',
    },
    {
        name: 'Winch Mohamed Bahr',
        image: '/images/mohamedbahr.png',
        link: 'https://winchmohamedbahr.com/',
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0',
    responsive: [
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                arrows: false,
                centerMode: false,
            },
        },
    ],
};

const SponsorSlider: React.FC = () => {
    return (
        <div className="sponsor-slider-container">
            <Slider {...settings}>
                {sponsors.map((sponsor) => (
                    <div key={sponsor.name}>
                        <a href={sponsor.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <img
                                src={sponsor.image}
                                alt={sponsor.name}
                                className="sponsor-slider-image"
                            />
                        </a>
                        <div className="sponsor-slider-name">{sponsor.name}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SponsorSlider; 