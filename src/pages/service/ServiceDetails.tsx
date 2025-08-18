import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getService } from "../../lib/api";
import type { Service } from "../../types/service";
import Header from "../../components/header/Header";
import { useTranslation } from 'react-i18next';
import Footer from "../../components/footer/Footer";
import { FiMapPin, FiPhone, FiClock, FiStar, FiCheckCircle, FiShare2, FiHeart, FiNavigation, FiPlay } from 'react-icons/fi';

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const {t} = useTranslation();
    
    // Mock data for demonstration
    const rating = 4.8;
    const reviewCount = 127;
    const isOpen = true;
    const workingHours = "12:00 PM - 11:00 PM";
    const distance = "2.3 km away";
    
    useEffect(() => {
        if (id) {
            setLoading(true);
            getService(id as string).then(fetchedService => {
                // Only show the service if it's active
                if (fetchedService && fetchedService.isActive) {
                    setService(fetchedService);
                    setNotFound(false);
                } else {
                    setService(null);
                    setNotFound(true);
                }
            }).catch(() => {
                setService(null);
                setNotFound(true);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [id]);

    useEffect(() => {
        setSelectedImage(0);
    }, [service]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: service?.name,
                text: `Check out ${service?.name} - ${service?.description}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            // You could add a toast notification here
        }
    };

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const getVideoEmbedUrl = (url: string) => {
        // Handle YouTube URLs
        if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
            const videoId = url.includes('youtube.com/watch') 
                ? url.split('v=')[1]?.split('&')[0]
                : url.split('youtu.be/')[1]?.split('?')[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }
        // Handle Vimeo URLs
        if (url.includes('vimeo.com/')) {
            const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
            return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
        }
        // Return original URL if it's already an embed URL or other format
        return url;
    };

    if (loading) {
        return (
            <div className="service-loading">
                <div className="loading-spinner"></div>
                <p>Loading service details...</p>
            </div>
        );
    }

    if (notFound || !service) {
        return (
            <>
                <Header onSearch={() => {}} search={false}/>
                <div className="service-details-container">
                    <div className="service-not-found">
                        <h1>Service Not Available</h1>
                        <p>This service is currently not available or does not exist.</p>
                        <a href="/" className="back-to-home">← Back to Home</a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header onSearch={() => {}} search={false}/>
            <div className="service-details-container">
                {/* Hero Section */}
                <div className="service-hero">
                    <div className="service-hero-content">
                        <div className="service-hero-header">
                            {service.logo && (
                                <div className="service-logo-wrapper">
                                    <img 
                                        src={service.logo} 
                                        alt={`${service.name} logo`} 
                                        className="service-logo" 
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <div className="service-hero-info">
                                <div className="service-title-section">
                                    <h1 className="service-title">{service.name}</h1>
                                    <div className="service-actions">
                                        <button 
                                            onClick={handleFavorite}
                                            className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
                                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                        >
                                            <FiHeart />
                                        </button>
                                        <button 
                                            onClick={handleShare}
                                            className="action-btn share-btn"
                                            aria-label="Share service"
                                        >
                                            <FiShare2 />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="service-meta">
                                    <div className="service-category">
                                        {service.category === 'repair' ? t('repair') : 
                                         service.category === 'carwash' ? t('carwash') : 
                                         service.category === 'spray' ? t('spray') : 
                                         service.category === 'spare parts' ? t('spare-parts') : 
                                         service.category === 'tires' ? t('tires') : 
                                         service.category === 'accessorize' ? t('accessorize') : 
                                         service.category === 'showroom' ? t('showroom') : ""}
                                    </div>
                                    
                                    <div className="service-rating">
                                        <div className="rating-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar 
                                                    key={i} 
                                                    className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="rating-value">{rating}</span>
                                        <span className="review-count">({reviewCount} reviews)</span>
                                    </div>
                                </div>
                                
                                <div className="service-status">
                                    <div className={`status-indicator ${isOpen ? 'open' : 'closed'}`}>
                                        <FiCheckCircle className="status-icon" />
                                        <span>{isOpen ? t('open') : t('closed')}</span>
                                    </div>
                                    <div className="service-hours">
                                        <FiClock className="hours-icon" />
                                        <span>{workingHours}</span>
                                    </div>
                                    <div className="service-distance">
                                        <FiNavigation className="distance-icon" />
                                        <span>{distance}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                {service.images && service.images.length > 0 && (
                    <div className="service-image-gallery">
                        <div className="service-primary-image-wrapper">
                            <img 
                                src={service.images[selectedImage]} 
                                alt={`${service.name} image ${selectedImage + 1}`} 
                                className="service-primary-image" 
                                loading="lazy"
                            />
                            <div className="image-overlay">
                                <div className="image-counter">
                                    {selectedImage + 1} / {service.images.length}
                                </div>
                            </div>
                        </div>
                        
                        {service.images.length > 1 && (
                            <div className="service-image-nav">
                                {service.images.map((img, index) => (
                                    <button
                                        key={img}
                                        className={`service-image-thumb-btn ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                        aria-label={`Show image ${index + 1}`}
                                    >
                                        <div className="service-image-thumb-wrapper">
                                            <img 
                                                src={img} 
                                                alt={`${service.name} thumbnail ${index + 1}`} 
                                                className="service-image-thumb" 
                                                loading="lazy"
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Description */}
                {service.description && (
                    <div className="service-description-section">
                        <h2 className="section-title">About {service.name}</h2>
                        <p className="service-description">{service.description}</p>
                    </div>
                )}

                {/* Special Offer */}
                {service.offer && (
                    <div className="service-offer-section">
                        <div className="offer-card">
                            <div className="offer-header">
                                <div className="offer-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                                <h2 className="offer-title">Special Offer</h2>
                            </div>
                            <div className="offer-content">
                                <p className="offer-text">{service.offer}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="service-content-grid">
                    {/* Contact & Services Section */}
                    <div className="service-info-section">
                        <div className="service-contact-card">
                            <h2 className="section-title">Contact Information</h2>
                            <div className="contact-info-s">
                                <div className="contact-item">
                                    <FiMapPin className="contact-icon" />
                                    <div className="contact-details">
                                        <span className="contact-label">Location</span>
                                        <span className="contact-value">{service.city}</span>
                                    </div>
                                </div>
                                
                                {service.address.length === 1 ? (
                                    <div className="contact-item">
                                        <FiMapPin className="contact-icon" />
                                        <div className="contact-details">
                                            <span className="contact-label">Address</span>
                                            <span className="contact-value">{service.address[0]}</span>
                                        </div>
                                    </div>
                                ) : (
                                    service.address.map((addr, index) => (
                                        <div key={addr} className="contact-item">
                                            <FiMapPin className="contact-icon" />
                                            <div className="contact-details">
                                                <span className="contact-label">Address {index + 1}</span>
                                                <span className="contact-value">{addr}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                                
                                {service.contact.length === 1 ? (
                                    <a href={`tel:${service.contact[0]}`} className="contact-item contact-link">
                                        <FiPhone className="contact-icon" />
                                        <div className="contact-details">
                                            <span className="contact-label">Phone</span>
                                            <span className="contact-value">{service.contact[0]}</span>
                                        </div>
                                    </a>
                                ) : (
                                    service.contact.map((contact, index) => (
                                        contact.startsWith('+') ? (
                                            <a 
                                                key={contact} 
                                                href={`https://wa.me/${contact}`} 
                                                className="contact-item contact-link whatsapp"
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                <svg className="contact-icon whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/>
                                                    <path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"/>
                                                    <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"/>
                                                    <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"/>
                                                </svg>
                                                <div className="contact-details">
                                                    <span className="contact-label">WhatsApp</span>
                                                    <span className="contact-value">{contact}</span>
                                                </div>
                                            </a>
                                        ) : (
                                            <a 
                                                key={contact} 
                                                href={`tel:${contact}`} 
                                                className="contact-item contact-link"
                                            >
                                                <FiPhone className="contact-icon" />
                                                <div className="contact-details">
                                                    <span className="contact-label">Phone {index + 1}</span>
                                                    <span className="contact-value">{contact}</span>
                                                </div>
                                            </a>
                                        )
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="service-services-card">
                            <h2 className="section-title">{t('services')}</h2>
                            <div className="services-grid">
                                {service.servicesOffered.map((item, index) => (
                                    <div key={index} className="service-item">
                                        <div className="service-item-icon">
                                            <FiCheckCircle />
                                        </div>
                                        <span className="service-item-text">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="service-map-section">
                        <h2 className="section-title">Location</h2>
                        <div className="service-map-wrapper">
                            <iframe 
                                src={service.location}
                                width="100%"
                                height="400"
                                allowFullScreen
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map location of ${service.name}`}
                            />
                        </div>

                        {/* Video Section */}
                        {service.videoUrl && (
                            <div className="service-video-section">
                                <h2 className="section-title">Video</h2>
                                <div className="service-video-wrapper">
                                    {!isVideoPlaying ? (
                                        <div className="video-placeholder" onClick={() => setIsVideoPlaying(true)}>
                                            <div className="video-thumbnail">
                                                <div className="play-button">
                                                    <FiPlay />
                                                </div>
                                                <div className="video-overlay">
                                                    <span className="video-label">Click to play video</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="video-container">
                                            <iframe
                                                src={getVideoEmbedUrl(service.videoUrl)}
                                                width="100%"
                                                height="400"
                                                allowFullScreen
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                title={`Video for ${service.name}`}
                                                onLoad={() => setIsVideoPlaying(true)}
                                            />
                                            <button 
                                                className="video-close-btn"
                                                onClick={() => setIsVideoPlaying(false)}
                                                aria-label="Close video"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social Media Section */}
                {service.social && service.social.length > 0 && (
                    <div className="service-social-section">
                        <h2 className="section-title">Follow {service.name}</h2>
                        <div className="social-links">
                            {service.social.map((socialLink) => (
                                socialLink.includes('facebook') ? (
                                    <a key={socialLink} href={socialLink} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                        </svg>
                                        <span>Facebook</span>
                                    </a>
                                ) : socialLink.includes('instagram') ? (
                                    <a key={socialLink} href={socialLink} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                        <span>Instagram</span>
                                    </a>
                                ) : socialLink.includes('tiktok') ? (
                                    <a key={socialLink} href={socialLink} target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                        </svg>
                                        <span>TikTok</span>
                                    </a>
                                ) : (
                                    <a key={socialLink} href={socialLink} target="_blank" rel="noopener noreferrer" className="social-link other">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                        </svg>
                                        <span>Website</span>
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
