import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {
    getServices,
    createService,
    updateService,
    deleteService,
} from '../../lib/api';
import type { Service } from '../../types/service';
import ServiceList from '../../components/admin/ServiceList';
import './Dashboard.css';

const Dashboard = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch services', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleAdd = async (serviceData: Omit<Service, '_id'>) => {
        try {
            const newService = await createService(serviceData);
            setServices((prev) => [...prev, newService]);
        } catch (error) {
            console.error('Failed to create service', error);
        }
    };

    const handleUpdate = async (id: string, serviceData: Omit<Service, '_id'>) => {
        try {
            const updatedService = await updateService(id, serviceData);
            setServices((prev) =>
                prev.map((s) => (s._id === id ? updatedService : s))
            );
        } catch (error) {
            console.error('Failed to update service', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteService(id);
            setServices((prev) => prev.filter((s) => s._id !== id));
        } catch (error) {
            console.error('Failed to delete service', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <>
            <Header onSearch={() => {}} search={false} />
            <div className="admin-dashboard-container">
                <ServiceList
                    services={services}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
