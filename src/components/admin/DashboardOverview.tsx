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

        return {
            categoryBreakdown,
            citiesCount,
            servicesWithImages,
            servicesWithLogo,
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