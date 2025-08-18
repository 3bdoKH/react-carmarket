import React, { useState, useEffect } from 'react';
import { getSponsoredServices } from '../lib/api';
import type { Service } from '../types/service';
import './advertisedServices.css';

interface AdvertisedServicesProps {
    maxServices?: number;
    title?: string;
    subtitle?: string;
}

const AdvertisedServices: React.FC<AdvertisedServicesProps> = ({ 
    maxServices = 6,
    title = "Featured Services",
    subtitle = "Discover our top recommended sponsored services"
}) => {
    const [advertisedServices, setAdvertisedServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSponsoredServices = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const sponsoredServices = await getSponsoredServices();
                
                // Limit the number of services to display
                const limitedServices = sponsoredServices.slice(0, maxServices);
                setAdvertisedServices(limitedServices);
            } catch (err) {
                console.error('Error fetching sponsored services:', err);
                setError('Failed to load sponsored services');
            } finally {
                setLoading(false);
            }
        };

        fetchSponsoredServices();
    }, [maxServices]);

    if (loading) {
        return (
            <div className="advertised-services-container">
                <div className="advertised-services-header">
                    <h2>{title}</h2>
                </div>
                <div className="loading">Loading sponsored services...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="advertised-services-container">
                <div className="advertised-services-header">
                    <h2>{title}</h2>
                </div>
                <div className="error">{error}</div>
            </div>
        );
    }

    if (advertisedServices.length === 0) {
        return null; // Don't render anything if no services
    }

    return (
        <div className="advertised-services-container">
            <div className="advertised-services-header">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
            
            <div className="advertised-services-grid">
                {advertisedServices.map((service) => (
                    <div key={service._id} className="advertised-service-card">
                        <div className="sponsored-badge-overlay">
                            <span className="sponsored-badge-ad">⭐ Sponsored</span>
                        </div>
                        <div className="service-image-container">
                            {service.logo ? (
                                <img 
                                    src={service.logo} 
                                    alt={service.name}
                                    className="service-logo-ad"
                                />
                            ) : (
                                <div className="service-logo-placeholder">
                                    {service.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        
                        <div className="service-content">
                            <h3 className="service-name">{service.name}</h3>
                            <p className="service-category">{service.category === 'accessorize' ? 'Accessories' : service.category}</p>
                            <p className="service-description">
                                {service.description.length > 100 
                                    ? `${service.description.substring(0, 100)}...` 
                                    : service.description}
                            </p>
                            <div className="service-location">
                                <span className="location-icon">📍</span>
                                {service.city}, {service.address}
                            </div>
                            
                            <div className="service-actions">
                                <a 
                                    href={`/service/${service._id}`} 
                                    className="view-service-btn"
                                >
                                    View Details
                                </a>
                                {service.contact && service.contact.length > 0 && (
                                    <a 
                                        href={`tel:${service.contact[0]}`}
                                        className="contact-btn"
                                    >
                                        Call Now
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvertisedServices; 