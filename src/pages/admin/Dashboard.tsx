import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices, createService, updateService, deleteService } from '../../lib/api';
import type { Service } from '../../types/service';
import ServiceList from '../../components/admin/ServiceList';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardOverview from '../../components/admin/DashboardOverview';
import './Dashboard.css';

type DashboardView = 'overview' | 'services' | 'analytics' | 'settings';

const Dashboard = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<DashboardView>('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = searchTerm 
            ? service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              service.description.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <AdminSidebar 
                currentView={currentView}
                onViewChange={setCurrentView}
                onLogout={handleLogout}
                onSidebarToggle={setIsSidebarCollapsed}
            />
            
            <main className={`admin-main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <div className="admin-header">
                    <h1 className="admin-title">
                        {currentView === 'overview' && 'Dashboard Overview'}
                        {currentView === 'services' && 'Service Management'}
                        {currentView === 'analytics' && 'Analytics'}
                        {currentView === 'settings' && 'Settings'}
                    </h1>
                </div>

                <div className="admin-content">
                    {currentView === 'overview' && (
                        <DashboardOverview 
                            services={services}
                            totalServices={services.length}
                            categoriesCount={new Set(services.map(s => s.category)).size}
                        />
                    )}
                    
                    {currentView === 'services' && (
                        <div className="services-management">
                            <div className="services-filters">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                                <div className="category-filter">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="category-select"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="repair">Repair</option>
                                        <option value="carwash">Car Wash</option>
                                        <option value="spray">Spray</option>
                                        <option value="spare parts">Spare Parts</option>
                                        <option value="tires">Tires</option>
                                        <option value="accessorize">Accessorize</option>
                                        <option value="showroom">Showroom</option>
                                    </select>
                                </div>
                            </div>
                            
                            <ServiceList
                                services={filteredServices}
                                onAdd={handleAdd}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                    
                    {currentView === 'analytics' && (
                        <div className="analytics-placeholder">
                            <h2>Analytics Dashboard</h2>
                            <p>Analytics features coming soon...</p>
                        </div>
                    )}
                    
                    {currentView === 'settings' && (
                        <div className="settings-placeholder">
                            <h2>Admin Settings</h2>
                            <p>Settings features coming soon...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
