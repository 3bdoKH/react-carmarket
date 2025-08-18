import { useMemo } from 'react';
import type { Service } from '../../types/service';
import './DashboardOverview.css';

interface DashboardOverviewProps {
    services: Service[];
    totalServices: number;
    categoriesCount: number;
}

const DashboardOverview = ({ services, totalServices, categoriesCount }: DashboardOverviewProps) => {
    const stats = useMemo(() => {
        const categoryBreakdown = services.reduce((acc, service) => {
            acc[service.category] = (acc[service.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const citiesCount = new Set(services.map(s => s.city)).size;
        const servicesWithImages = services.filter(s => s.images && s.images.length > 0).length;
        const servicesWithLogo = services.filter(s => s.logo).length;
        const activeServices = services.filter(s => s.isActive).length;
        const inactiveServices = services.length - activeServices;
        const sponsoredServices = services.filter(s => s.isSponsored).length;
        const regularServices = services.length - sponsoredServices;

        return {
            categoryBreakdown,
            citiesCount,
            servicesWithImages,
            servicesWithLogo,
            activeServices,
            inactiveServices,
            sponsoredServices,
            regularServices,
            averageServicesPerService: services.reduce((acc, s) => acc + s.servicesOffered.length, 0) / services.length || 0
        };
    }, [services]);

    const recentServices = services.slice(0, 5);

    return (
        <div className="dashboard-overview">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🔧</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{totalServices}</h3>
                        <p className="stat-label">Total Services</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📂</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{categoriesCount}</h3>
                        <p className="stat-label">Categories</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🌍</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{stats.citiesCount}</h3>
                        <p className="stat-label">Cities</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📸</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{stats.servicesWithImages}</h3>
                        <p className="stat-label">With Images</p>
                    </div>
                </div>

                <div className="stat-card active">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{stats.activeServices}</h3>
                        <p className="stat-label">Active Services</p>
                    </div>
                </div>

                <div className="stat-card inactive">
                    <div className="stat-icon">⏸️</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{stats.inactiveServices}</h3>
                        <p className="stat-label">Inactive Services</p>
                    </div>
                </div>

                <div className="stat-card sponsored">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{stats.sponsoredServices}</h3>
                        <p className="stat-label">Sponsored Services</p>
                    </div>
                </div>

                <div className="stat-card regular">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3 className="stat-number">{stats.regularServices}</h3>
                        <p className="stat-label">Regular Services</p>
                    </div>
                </div>
            </div>

            <div className="overview-sections">
                <div className="category-breakdown">
                    <h2 className="section-title">Category Breakdown</h2>
                    <div className="category-list">
                        {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
                            <div key={category} className="category-item">
                                <div className="category-info">
                                    <span className="category-name">{category}</span>
                                    <span className="category-count">{count}</span>
                                </div>
                                <div className="category-bar">
                                    <div 
                                        className="category-progress" 
                                        style={{ width: `${(count / totalServices) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="recent-services">
                    <h2 className="section-title">Recent Services</h2>
                    <div className="recent-list">
                        {recentServices.map(service => (
                            <div key={service._id} className="recent-item">
                                <div className="recent-info">
                                    <h4 className="recent-name">{service.name}</h4>
                                    <p className="recent-category">{service.category}</p>
                                    <p className="recent-location">{service.city}</p>
                                </div>
                                <div className="recent-stats">
                                    <span className="recent-services-count">
                                        {service.servicesOffered.length} services
                                    </span>
                                    <span className={`recent-status ${service.isActive ? 'active' : 'inactive'}`}>
                                        {service.isActive ? '✅' : '⏸️'}
                                    </span>
                                    <span className={`recent-sponsored ${service.isSponsored ? 'sponsored' : 'regular'}`}>
                                        {service.isSponsored ? '⭐' : '📋'}
                                    </span>
                                    {service.logo && <span className="has-logo">📷</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardOverview; 