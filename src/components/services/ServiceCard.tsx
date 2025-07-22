import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import type { Service } from '../../types/service';
import { useTranslation } from 'react-i18next';
import './serviceCard.css'
interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const {t} = useTranslation('common')
    return (
        <Link to={`/service/${service._id}`} className='service-link'>
            <div className="service-card">
                <div className="service-card-image-section">
                {service.images?.[0] ? (
                    <img
                    src={service.images[0]}
                    alt={service.name}
                    className="service-card-image"
                    />
                ) : (
                    <div className="service-card-no-image">
                    <span>No Image Available</span>
                    </div>
                )}
                
                {service.logo && (
                    <div className="service-card-logo">
                    <img
                        src={service.logo}
                        alt={`${service.name} logo`}
                        width={64}
                        height={64}
                        className="service-card-logo-img"
                    />
                    </div>
                )}
                
                <div className="service-card-category">
                {
                    service.category === 'repair' ? t('repair') : service.category === 'carwash' ? t('carwash') : service.category === 'spray' ? t('spray') : service.category === 'spare parts' ? t('spare-parts') : service.category === 'tires' ? t('tires') : service.category === 'accessorize' ? t('accessorize') : service.category === 'showroom' ? t('showroom') : ""
                } 
                </div>
                </div>

                <div className="service-card-content">
                <h3 className="service-card-title">{service.name}</h3>
                
                {service.servicesOffered.length > 0 && (
                    <div className="service-card-services">
                    <p className="service-card-services-label">{t('services')}</p>
                    <div className="service-card-chips">
                        {service.servicesOffered.slice(0, 3).map((serviceItem, index) => (
                        <span 
                            key={index} 
                            className="service-card-chip"
                        >
                            {serviceItem}
                        </span>
                        ))}
                        {service.servicesOffered.length > 3 && (
                        <span className="service-card-chip">
                            +{service.servicesOffered.length - 3} more
                        </span>
                        )}
                    </div>
                    </div>
                )}

                

                <div className="service-card-meta">
                    <div className="service-card-address">
                    <FiMapPin className="service-card-meta-icon" />
                    <span>{service.city}</span>
                    </div>
                    <div className="service-card-address">
                    <FiMapPin className="service-card-meta-icon" />
                    <span>{service.address}</span>
                    </div>
                    <div className="service-card-contact">
                    <FiPhone className="service-card-meta-icon" />
                    <span>{service.contact}</span>
                    </div>
                </div>
                </div>
            </div>
        </Link>
    );
}