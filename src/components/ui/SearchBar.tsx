import { useState } from 'react';
import type { ServiceCategory } from '../../types/service';
import { useTranslation } from 'react-i18next';
import './searchBar.css';

interface SearchBarProps {
    onSearch: (term: string, category?: ServiceCategory, city?: string) => void;
    showCity?: boolean;
    search? : boolean;
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

export default function SearchBar({ onSearch, showCity , search = false }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
    const [city, setCity] = useState('');
    const { t } = useTranslation('common');

    const handleSearch = () => {
        onSearch(
        searchTerm,
        selectedCategory === 'all' ? undefined : selectedCategory,
        showCity ? city : undefined
        );
    };

    return (
        <div className="searchbar">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {
                search && (
                    <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('search') || 'Search'}
                    className="searchbar-input"
                    style={{ minWidth: 160 }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                )
            }

            <select
            value={selectedCategory}
            onChange={(e) => {
                const value = e.target.value as ServiceCategory | 'all';
                setSelectedCategory(value);
                onSearch(
                searchTerm,
                value === 'all' ? undefined : value,
                showCity ? city : undefined
                );
            }}
            className="searchbar-select"
            >
            <option value="all">{t('all-categories')}</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                {
                    category === 'repair' ? t('repair') :
                    category === 'carwash' ? t('carwash') :
                    category === 'spray' ? t('spray') :
                    category === 'spare parts' ? t('spare-parts') :
                    category === 'tires' ? t('tires') :
                    category === 'accessorize' ? t('accessorize') :
                    category === 'showroom' ? t('showroom') : ''
                }
                </option>
            ))}
            </select>

            {showCity && (
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t('city-search') || 'City'}
                className="searchbar-input"
                style={{ minWidth: 120 }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            )}
        </div>

        <button onClick={handleSearch} className="searchbar-btn">
            {t('search')}
        </button>
        </div>
    );
}
