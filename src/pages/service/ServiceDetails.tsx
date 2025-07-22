import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getService } from "../../lib/api";
import type { Service } from "../../types/service";
import Header from "../../components/header/Header";
import { useTranslation } from 'react-i18next';
import Footer from "../../components/footer/Footer";
export default function ServiceDetail() {
    // const router = useRouter();
    // const { id } = router.query;
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const {t} = useTranslation();
    useEffect(() => {
        if (id) {
            getService(id as string).then(setService);
        }
    }, [id]);

    useEffect(() => {
        setSelectedImage(0);
    }, [service]);


    if (!service) return <div className="service-loading">Loading...</div>;

    // Removed metaTitle, metaDescription, metaOgImage, metaUrl as they are unused

    return (
        <>

        <Header onSearch={() => {}} search={false}/>
        <div className="service-details-container">
            <div className="service-header">
                {service.logo && (
                    <div className="service-logo-wrapper">
                        <img src={service.logo} alt={`${service.name} logo`} width={64} height={64} className="service-logo" />
                    </div>
                )}
                <div className="service-header-info">
                    <h1 className="service-title">{service.name}</h1>
                    <span className="service-category">
                        {
                            service.category === 'repair' ? t('repair') : service.category === 'carwash' ? t('carwash') : service.category === 'spray' ? t('spray') : service.category === 'spare parts' ? t('spare-parts') : service.category === 'tires' ? t('tires') : service.category === 'accessorize' ? t('accessorize') : service.category === 'showroom' ? t('showroom') : ""
                        } 
                    </span>
                </div>
            </div>
            {service.images && service.images.length > 0 && (
                <div className="service-image-gallery">
                    <div className="service-primary-image-wrapper">
                        <img src={service.images?.[selectedImage]} alt={`${service.name} image ${selectedImage+1}`} className="service-primary-image" style={{width: '100%', height: 'auto'}} />
                    </div>
                    <div className="service-image-nav">
                        {service.images?.map((img) => (
                            <button
                                key={img}
                                className={`service-image-thumb-btn${selectedImage === service.images?.indexOf(img) ? ' active' : ''}`}
                                onClick={() => setSelectedImage(service.images?.indexOf(img) ?? 0)}
                                aria-label={`Show image ${(service.images?.indexOf(img) ?? 0)+1}`}
                            >
                                <div className="service-image-thumb-wrapper">
                                    <img src={img} alt={`${service.name} thumbnail`} className="service-image-thumb" style={{width: '64px', height: '64px', objectFit: 'cover'}} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {service.description && (
                <p className="service-description">{service.description}</p>
            )}
            <div className="service-info-section">
                <div className="service-info-details">
                    <p className="service-address">📍 {service.city}</p>
                    <p className="service-address">📍 {service.address}</p>
                    {
                        service.contact.length === 1 && (
                            <a href={`tel:${service.contact[0]}`} className="service-contact">📞 {service.contact[0]}</a>
                        )
                    }
                    {
                        service.contact.length > 1 && (
                            service.contact.map((c) => (
                                c.startsWith('+') ? <a key={c} href={`https://wa.me/${c}`} className="service-contact" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48"><path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path></svg>
                                    {c}</a> : <a key={c} href={`tel:${c}`} className="service-contact">📞 {c}</a>
                            ))
                        )
                    }

                    <div className="service-offered-section">
                        <h2 className="service-offered-title">{t('services')}</h2>
                        <ul className="service-offered-list">
                            {service.servicesOffered.map((item) => (
                                <li key={item} className="service-offered-item">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="service-map-wrapper">
                    
                        <iframe 
                        src={service.location}
                        width="600"
                        height="450"
                        allowFullScreen
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    
                </div>
            </div>
        </div>
        {service.social && service.social.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', gap:'1.5rem' }}>
                {
                    service.social.map((s) => (
                        s.includes('facebook') ? 
                        <a key={s} href={s} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                <path fill="#1877F2" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                            </svg>
                        </a> : s.includes('tiktok') ? 
                        <a key={s} href={s} target="_blank" rel="noopener noreferrer" aria-label="Tiktok">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                <path fill="#000000" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                        </a> : s.includes('instagram') ? 
                        <a key={s} href={s} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                <path fill="#E4405F" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a> : s.includes('x.com') ? 
                        <a key={s} href={s} target="_blank" rel="noopener noreferrer" aria-label="X">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                <path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a> : 
                        <a key={s} href={s} target="_blank" rel="noopener noreferrer" aria-label="Other Social">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                        </a> 
                    ))
                }
            </div>
        )}
        <Footer />
        </>
    );
}
