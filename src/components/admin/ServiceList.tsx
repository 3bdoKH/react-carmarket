import { useState } from 'react';
import type { Service } from '../../types/service';
import ServiceForm from './ServiceForm';
interface ServiceListProps {
    services: Service[];
    onAdd: (data: Omit<Service, '_id'>) => Promise<void>;
    onUpdate: (id: string, data: Omit<Service, '_id'>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function ServiceList({ services, onAdd, onUpdate, onDelete }: ServiceListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (service: Service) => {
        setEditingId(service._id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="service-list-container">
            <div className="heading">
                <h1 className="title">Manage Services</h1>
                <button
                onClick={() => setShowForm(true)}
                className="button"
                >
                Add New Service
                </button>
            </div>

            {showForm && !editingId && (
                <ServiceForm
                onSubmit={async (data) => {
                    await onAdd(data);
                    setShowForm(false);
                }}
                onCancel={handleCancel}
                />
            )}

            <div className="service-list">
                {services.map(service => (
                <div key={service._id} className="service-card">
                    {editingId === service._id ? (
                    <ServiceForm
                        initialData={service}
                        onSubmit={async (data) => {
                        await onUpdate(service._id, data);
                        setEditingId(null);
                        }}
                        onCancel={handleCancel}
                    />
                    ) : (
                    <div className="service-card-content">
                        <div className="service-card-main">
                        <h3 className="service-card-title">{service.name}</h3>
                        <p className="service-card-category">Category: {service.category}</p>
                        <p className="service-card-address">Address: {service.address}</p>
                        <p className="service-card-contact">Contact: {service.contact}</p>
                        <p className="service-card-description">{service.description}</p>
                        {service.city && (
                          <p className="service-card-location">Location: {service.city}</p>
                        )}
                        <div className="service-card-chips">
                            {service.servicesOffered.map((item, i) => (
                            <span key={i} className="service-chip">
                                {item}
                            </span>
                            ))}
                        </div>
                        {service.logo && (
                            <div className="service-card-logo">
                                <span>Logo:</span>
                                <img src={service.logo} alt="logo" className="service-logo-img" />
                            </div>
                            )}
                            {service.images && service.images.length > 0 && (
                            <div className="service-card-images">
                                <span>Images:</span>
                                <div className="service-images-list">
                                {service.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`service-img-${idx}`} className="service-image-thumb" />
                                ))}
                                </div>
                            </div>
                        )}
                        </div>
                        <div className="service-card-actions">
                        <button
                            onClick={() => handleEdit(service)}
                            className="service-edit-btn"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(service._id)}
                            className="service-delete-btn"
                        >
                            Delete
                        </button>
                        </div>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}