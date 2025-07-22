import { useState, useEffect } from 'react';
import type { Service, ServiceCategory } from '../../types/service';

const categories: ServiceCategory[] = ['repair', 'carwash', 'spray', 'spare parts', 'tires', 'accessorize', 'showroom'];

interface ServiceFormProps {
    initialData?: Partial<Service>;
    onSubmit: (data: Omit<Service, '_id'>) => void;
    onCancel: () => void;
}

export default function ServiceForm({ initialData, onSubmit, onCancel }: ServiceFormProps) {
    const [formData, setFormData] = useState<Omit<Service, '_id'>>({
        name: '',
        address: '',
        city: '',
        description: '',
        category: 'repair',
        servicesOffered: [],
        images: [],
        logo: '',
        location: '',
        social : [],
        ...initialData,
        contact: initialData?.contact || [],
    });

    const [currentService, setCurrentService] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [social, setCurrentSocial] = useState('')
    const [currentContact, setCurrentContact] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddService = () => {
        if (currentService.trim()) {
        setFormData(prev => ({
            ...prev,
            servicesOffered: [...prev.servicesOffered, currentService.trim()]
        }));
        setCurrentService('');
        }
    };
    const handleAddSocial = () => {
        if (social.trim()) {
        setFormData(prev => ({
            ...prev,
            social: [...prev.social, social.trim()]
        }));
        setCurrentSocial('');
        }
    };

    const handleRemoveSocial = (index: number) => {
        setFormData(prev => ({
        ...prev,
        social: prev.social.filter((_, i) => i !== index)
        }));
    };
    const handleRemoveService = (index: number) => {
        setFormData(prev => ({
        ...prev,
        servicesOffered: prev.servicesOffered.filter((_, i) => i !== index)
        }));
    };

    const handleAddImage = () => {
        if (currentImage.trim()) {
            setFormData(prev => ({
                ...prev,
                images: [...(prev.images || []), currentImage.trim()]
            }));
            setCurrentImage('');
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: (prev.images || []).filter((_, i) => i !== index)
        }));
    };

    const handleAddContact = () => {
        if (currentContact.trim()) {
            setFormData(prev => ({
                ...prev,
                contact: [...(prev.contact || []), currentContact.trim()]
            }));
            setCurrentContact('');
        }
    };
    const handleRemoveContact = (index: number) => {
        setFormData(prev => ({
            ...prev,
            contact: (prev.contact || []).filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="service-form">
        <h2 className="form-title">
            {initialData?._id ? 'Edit Service' : 'Add New Service'}
        </h2>

        <div className="form-row">
            <div className="form-group">
            <label className="form-label">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
            />
            </div>

            <div className="form-group">
            <label className="form-label">Category</label>
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
            >
                {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            </div>
        </div>

        <div className="form-group">
            <label className="form-label">Address</label>
            <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
            required
            />
        </div>
        <div className="form-group">
            <label className="form-label">City</label>
            <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-input"
            required
            />
        </div>

        <div className="form-row">
            <div className="form-group">
            <label className="form-label">Contact</label>
            <div className="form-inline">
                <input
                    type="text"
                    value={currentContact}
                    onChange={(e) => setCurrentContact(e.target.value)}
                    className="form-input form-input-inline"
                    placeholder="Add a contact (phone, email, etc.)"
                />
                <button
                    type="button"
                    onClick={handleAddContact}
                    className="form-btn"
                >
                    Add
                </button>
            </div>
            <div className="chip-list">
                {(formData.contact || []).map((contact, index) => (
                    <span key={index} className="chip">
                        {contact}
                        <button
                            type="button"
                            onClick={() => handleRemoveContact(index)}
                            className="chip-remove"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
            </div>

            <div className="form-group">
            <label className="form-label">Logo URL</label>
            <input
                type="text"
                name="logo"
                value={formData.logo || ''}
                onChange={handleChange}
                className="form-input"
            />
            </div>
        </div>

        {/* Images input section */}
        <div className="form-group">
            <label className="form-label">Image URLs</label>
            <div className="form-inline">
            <textarea
                value={currentImage || ''}
                onChange={(e) => setCurrentImage(e.target.value)}
                className="form-input form-input-inline"
                placeholder="Paste one or more image URLs, separated by spaces or newlines"
                rows={3}
            />
            <button
                type="button"
                onClick={() => {
                    // Split by whitespace (spaces, newlines, tabs), remove empty, remove leading @ if present
                    const urls = (currentImage || '')
                        .split(/\s+/)
                        .map(url => url.replace(/^@/, '').trim())
                        .filter(Boolean);
                    if (urls.length > 0) {
                        setFormData(prev => ({
                            ...prev,
                            images: [...(prev.images || []), ...urls]
                        }));
                        setCurrentImage('');
                    }
                }}
                className="form-btn"
            >
                Add
            </button>
            </div>
            <div className="chip-list">
            {(formData.images || []).map((img, index) => (
                <span key={index} className="chip">
                {img}
                <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="chip-remove"
                >
                    ×
                </button>
                </span>
            ))}
            </div>
        </div>

        <div className="form-group">
            <label className="form-label">Location (Google Maps Embed URL)</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                placeholder="Paste Google Maps embed URL here"
            />
        </div>

        <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="form-textarea"
            />
        </div>

        

        <div className="form-group">
            <label className="form-label">Services Offered</label>
            <div className="form-inline">
            <input
                type="text"
                value={currentService}
                onChange={(e) => setCurrentService(e.target.value)}
                className="form-input form-input-inline"
                placeholder="Add a service"
            />
            <button
                type="button"
                onClick={handleAddService}
                className="form-btn"
            >
                Add
            </button>
            </div>
            <div className="chip-list">
            {formData.servicesOffered.map((service, index) => (
                <span key={index} className="chip">
                {service}
                <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="chip-remove"
                >
                    ×
                </button>
                </span>
            ))}
            </div>
        </div>
        <div className="form-group">
            <label className="form-label">Social Links</label>
            <div className="form-inline">
            <input
                type="text"
                value={social}
                onChange={(e) => setCurrentSocial(e.target.value)}
                className="form-input form-input-inline"
                placeholder="Add a social link"
            />
            <button
                type="button"
                onClick={handleAddSocial}
                className="form-btn"
            >
                Add
            </button>
            </div>
            <div className="chip-list">
            {formData.social.map((social, index) => (
                <span key={index} className="chip">
                {social}
                <button
                    type="button"
                    onClick={() => handleRemoveSocial(index)}
                    className="chip-remove"
                >
                    ×
                </button>
                </span>
            ))}
            </div>
        </div>

        <div className="form-actions">
            <button
            type="button"
            onClick={onCancel}
            className="form-btn form-btn-secondary"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="form-btn form-btn-primary"
            >
            {initialData?._id ? 'Update' : 'Create'}
            </button>
        </div>
        </form>
    );
}