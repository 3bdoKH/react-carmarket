import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiClock, FiStar, FiCheckCircle } from 'react-icons/fi';
import type { Service } from '../../types/service';
import { useTranslation } from 'react-i18next';
import './serviceCard.css'

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const {t} = useTranslation('common')
    
    
    const rating = 5;
    const isOpen = true; 
    const workingHours = "12:00 PM - 11:00 PM"; 
    
    return (
        <Link to={`/service/${service._id}`} className='service-link' aria-label={`View details for ${service.name}`}>
            <div className="service-card">
                <div className="service-card-image-section">
                    {service.images?.[0] ? (
                        <img
                            src={service.images[0]}
                            alt={service.name}
                            className="service-card-image"
                            loading="lazy"
                        />
                    ) : (
                        <div className="service-card-no-image">
                            <span>No Image Available</span>
                        </div>
                    )}
                    
                    {/* Status indicator */}
                    <div className={`service-card-status ${isOpen ? 'open' : 'closed'}`}>
                        <FiCheckCircle className="status-icon" />
                        <span>{isOpen ? t('open') : t('closed')}</span>
                    </div>
                    
                    {service.logo && (
                        <div className="service-card-logo">
                            <img
                                src={service.logo}
                                alt={`${service.name} logo`}
                                width={64}
                                height={64}
                                className="service-card-logo-img"
                                loading="lazy"
                            />
                        </div>
                    )}
                    
                    
                </div>

                <div className="service-card-content">
                    <div className="service-card-header">
                        <h3 className="service-card-title">{service.name}</h3>
                        
                        {/* Rating */}
                        <div className="service-card-rating">
                            <FiStar className="rating-icon" />
                            <span className="rating-value">{rating}</span>
                        </div>
                    </div>
                    
                    {/* Working hours */}
                    <div className="service-card-hours">
                        <FiClock className="hours-icon" />
                        <span>{workingHours}</span>
                    </div>
                    
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
                                    <span className="service-card-chip more-chip">
                                        +{service.servicesOffered.length - 3} {t('more')}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="service-card-meta">
                        <div className="service-card-address">
                            <FiMapPin className="service-card-meta-icon" />
                            <span className="meta-text">{service.city}</span>
                        </div>
                        <div className="service-card-address">
                            <FiMapPin className="service-card-meta-icon" />
                            <span className="meta-text">{service.address}</span>
                        </div>
                        <div className="service-card-contact">
                            <FiPhone className="service-card-meta-icon" />
                            <span className="meta-text">{service.contact[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}