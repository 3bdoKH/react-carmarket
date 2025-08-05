import { useState } from 'react';
import type { Service } from '../../types/service';
import ServiceForm from './ServiceForm';
import './serviceList.css';

interface ServiceListProps {
    services: Service[];
    onAdd: (data: Omit<Service, '_id'>) => Promise<void>;
    onUpdate: (id: string, data: Omit<Service, '_id'>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function ServiceList({ services, onAdd, onUpdate, onDelete }: ServiceListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const handleEdit = (service: Service) => {
        setEditingId(service._id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowForm(false);
    };

    const handleDeleteClick = (id: string) => {
        setDeleteConfirm(id);
    };

    const handleDeleteConfirm = async (id: string) => {
        try {
            await onDelete(id);
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Failed to delete service:', error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirm(null);
    };

    return (
        <div className="service-list-container">
            <div className="service-list-header">
                <div className="service-list-info">
                    <h2 className="service-list-title">Service Management</h2>
                    <p className="service-list-subtitle">
                        Manage {services.length} service{services.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="add-service-btn"
                >
                    <span className="btn-icon">➕</span>
                    Add New Service
                </button>
            </div>

            {showForm && !editingId && (
                <div className="form-overlay">
                    <div className="form-container">
                        <ServiceForm
                            onSubmit={async (data) => {
                                await onAdd(data);
                                setShowForm(false);
                            }}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            )}

            {services.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🔧</div>
                    <h3>No services found</h3>
                    <p>Get started by adding your first service</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="empty-action-btn"
                    >
                        Add First Service
                    </button>
                </div>
            ) : (
                <div className="services-table-container">
                    <table className="services-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Service ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service._id} className="service-row">
                                    {editingId === service._id ? (
                                        <td colSpan={5} className="edit-cell">
                                            <ServiceForm
                                                initialData={service}
                                                onSubmit={async (data) => {
                                                    await onUpdate(service._id, data);
                                                    setEditingId(null);
                                                }}
                                                onCancel={handleCancel}
                                            />
                                        </td>
                                    ) : (
                                        <>
                                            <td className="service-name-cell">
                                                <div className="service-name">
                                                    {service.logo && (
                                                        <img 
                                                            src={service.logo} 
                                                            alt="logo" 
                                                            className="service-logo-small"
                                                        />
                                                    )}
                                                    <div>
                                                        <h4 className="service-title">{service.name}</h4>
                                                        <p className="service-description">
                                                            {service.description?.substring(0, 50)}
                                                            {service.description?.length > 50 ? '...' : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="category-badge">{service.category}</span>
                                            </td>
                                            <td>
                                                <div className="location-info">
                                                    <span className="city">{service.city}</span>
                                                    <span className="address">{service.address}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="service-id">
                                                    <span className="id-text">{service._id}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="edit-btn"
                                                        title="Edit service"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(service._id)}
                                                        className="delete-btn"
                                                        title="Delete service"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {deleteConfirm && (
                <div className="delete-modal">
                    <div className="delete-modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this service? This action cannot be undone.</p>
                        <div className="delete-modal-actions">
                            <button
                                onClick={handleDeleteCancel}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteConfirm(deleteConfirm)}
                                className="confirm-delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}