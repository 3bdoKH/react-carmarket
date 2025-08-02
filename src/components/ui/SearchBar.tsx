import { useState, useEffect } from 'react';
import type { ServiceCategory } from '../../types/service';
import { useTranslation } from 'react-i18next';
import './searchBar.css';

interface SearchBarProps {
    onSearch: (term: string, category?: ServiceCategory, city?: string) => void;
    showCity?: boolean;
    search?: boolean;
    immediateSearch?: boolean;
}

const categories: ServiceCategory[] = [
    'repair',
    'carwash',
    'spray',
    'spare parts',
    'tires',
    'accessorize',
    'showroom',
];

export default function SearchBar({ 
    onSearch, 
    showCity, 
    search = false, 
    immediateSearch = false 
}: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
    const [city, setCity] = useState('');
    const { t } = useTranslation('common');

    const handleSearch = () => {
        // Combine searchTerm and city into a single search term
        // If city is specified, it will be included in the search
        const combinedSearchTerm = showCity && city 
            ? `${searchTerm} ${city}`.trim() 
            : searchTerm;
        
        onSearch(
            combinedSearchTerm, // Send combined term
            selectedCategory === 'all' ? undefined : selectedCategory,
            showCity ? city : undefined
        );
    };

    useEffect(() => {
        if (immediateSearch) {
            const timer = setTimeout(() => {
                handleSearch();
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [searchTerm, selectedCategory, city, immediateSearch]);

    return (
        <div className="searchbar">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {search && (
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('search-services') || 'Search services...'}
                        className="searchbar-input"
                        style={{ minWidth: 160 }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                )}

                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        const value = e.target.value as ServiceCategory | 'all';
                        setSelectedCategory(value);
                        if (immediateSearch) {
                            handleSearch(); // Use the combined search handler
                        }
                    }}
                    className="searchbar-select"
                >
                    <option value="all">{t('all-categories')}</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {t(category.replace(' ', '-'))}
                        </option>
                    ))}
                </select>

                {showCity && (
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={'Search for a service'}
                        className="searchbar-input"
                        style={{ minWidth: 120 }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                )}
            </div>

            {!immediateSearch && (
                <button onClick={handleSearch} className="searchbar-btn">
                    {t('search')}
                </button>
            )}
        </div>
    );
}