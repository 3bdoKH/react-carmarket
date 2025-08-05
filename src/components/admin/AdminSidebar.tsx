import { useState } from 'react';
import './AdminSidebar.css';

type DashboardView = 'overview' | 'services' | 'analytics' | 'settings';

interface AdminSidebarProps {
    currentView: DashboardView;
    onViewChange: (view: DashboardView) => void;
    onLogout: () => void;
    onSidebarToggle?: (isCollapsed: boolean) => void;
}

const AdminSidebar = ({ currentView, onViewChange, onLogout, onSidebarToggle }: AdminSidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        onSidebarToggle?.(newCollapsedState);
    };

    const menuItems = [
        {
            id: 'overview' as DashboardView,
            label: 'Overview',
            icon: '📊',
            description: 'Dashboard overview'
        },
        {
            id: 'services' as DashboardView,
            label: 'Services',
            icon: '🔧',
            description: 'Manage services'
        }
    ];

    return (
        <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <h2 className="logo">Car Market</h2>
                    <span className="logo-subtitle">Admin Panel</span>
                </div>
                <button 
                    className="collapse-btn"
                    onClick={handleToggle}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <button
                                className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                                onClick={() => onViewChange(item.id)}
                                title={isCollapsed ? item.description : undefined}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {!isCollapsed && (
                                    <span className="nav-label">{item.label}</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button 
                    className="logout-btn"
                    onClick={onLogout}
                    title={isCollapsed ? 'Logout' : undefined}
                >
                    <span className="logout-icon">🚪</span>
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar; 