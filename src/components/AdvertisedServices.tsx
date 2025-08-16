import React, { useState, useEffect, useMemo } from 'react';
import { getService } from '../lib/api';
import type { Service } from '../types/service';
import './advertisedServices.css';

interface AdvertisedServicesProps {
    serviceIds: string[];
}

const AdvertisedServices: React.FC<AdvertisedServicesProps> = ({ serviceIds }) => {
    const [advertisedServices, setAdvertisedServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Memoize the service IDs to prevent unnecessary re-renders
    const memoizedServiceIds = useMemo(() => serviceIds, [serviceIds.join(',')]);

    useEffect(() => {
        const fetchAdvertisedServices = async () => {
            if (memoizedServiceIds.length === 0) {
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const services = await Promise.all(
                    memoizedServiceIds.map(id => getService(id))
                );
                
                setAdvertisedServices(services);
            } catch (err) {
                console.error('Error fetching advertised services:', err);
                setError('Failed to load advertised services');
            } finally {
                setLoading(false);
            }
        };

        fetchAdvertisedServices();
    }, [memoizedServiceIds]);

    if (loading && serviceIds.length > 0) {
        return (
            <div className="advertised-services-container">
                <div className="advertised-services-header">
                    <h2>Featured Services</h2>
                </div>
                <div className="loading">Loading featured services...</div>
            </div>
        );
    }

    if (error && serviceIds.length > 0) {
        return (
            <div className="advertised-services-container">
                <div className="advertised-services-header">
                    <h2>Featured Services</h2>
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
                <h2>Featured Services</h2>
                <p>Discover our top recommended services</p>
            </div>
            
            <div className="advertised-services-grid">
                {advertisedServices.map((service) => (
                    <div key={service._id} className="advertised-service-card">
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