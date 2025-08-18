import { useState, useEffect, useRef, useCallback } from 'react';
import type { ServiceCategory } from '../../types/service';
import { useTranslation } from 'react-i18next';
import './searchBar.css';
// Import for detecting Arabic text
import { isRTL } from '../../lib/rtlUtils';

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
    const [isFocused, setIsFocused] = useState(false);
    const [isRtlInput, setIsRtlInput] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { t, i18n } = useTranslation('common');
    
    // Check if current language is RTL
    const isRtlLanguage = i18n.language === 'ar';

    const handleSearch = useCallback(() => {
        const combinedSearchTerm = showCity && city 
            ? `${searchTerm} ${city}`.trim() 
            : searchTerm;
        
        // Use the raw search term - Fuse.js will handle the fuzzy matching
        // Our backend search will use the normalized text from searchUtils.ts
        onSearch(
            combinedSearchTerm,
            selectedCategory === 'all' ? undefined : selectedCategory,
            showCity ? city : undefined
        );
    }, [searchTerm, selectedCategory, city, showCity, onSearch]);

    const handleClearSearch = () => {
        setSearchTerm('');
        setCity('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        } else if (e.key === 'Escape') {
            handleClearSearch();
        }
    };

    useEffect(() => {
        if (immediateSearch) {
            const timer = setTimeout(() => {
                handleSearch();
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [searchTerm, selectedCategory, city, immediateSearch, handleSearch]);

    const hasSearchContent = searchTerm.trim() || city.trim();

    return (
        <div className={`searchbar ${isFocused ? 'focused' : ''}`}>
            <div className="searchbar-content">
                {search && (
                    <div className="searchbar-input-group">
                        <span className="searchbar-icon">🔍</span>
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setSearchTerm(newValue);
                                // Check if input contains RTL text
                                setIsRtlInput(isRTL(newValue));
                            }}
                            placeholder={t('search-services') || 'Search services...'}
                            className={`searchbar-input ${isRtlInput || isRtlLanguage ? 'rtl-input' : ''}`}
                            dir={isRtlInput || isRtlLanguage ? 'rtl' : 'ltr'}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            aria-label="Search for services"
                        />
                        {searchTerm && (
                            <button 
                                onClick={handleClearSearch}
                                className="searchbar-clear"
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                )}

                <div className="searchbar-filters">
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            const value = e.target.value as ServiceCategory | 'all';
                            setSelectedCategory(value);
                            if (immediateSearch) {
                                handleSearch();
                            }
                        }}
                        className="searchbar-select"
                        aria-label="Select service category"
                    >
                        <option value="all">{t('all-categories') || 'All Categories'}</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {t(category.replace(' ', '-')) || category}
                            </option>
                        ))}
                    </select>

                    {showCity && (
                        <div className="searchbar-input-group">
                            <span className="searchbar-icon">📍</span>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setCity(newValue);
                                    // No need to update isRtlInput here as we're using it for the main search
                                }}
                                placeholder={t('search-city') || 'City or location...'}
                                className={`searchbar-input ${isRtlInput || isRtlLanguage ? 'rtl-input' : ''}`}
                                dir={isRtlInput || isRtlLanguage ? 'rtl' : 'ltr'}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                aria-label="Search by city or location"
                            />
                            {city && (
                                <button 
                                    onClick={() => setCity('')}
                                    className="searchbar-clear"
                                    aria-label="Clear city"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {!immediateSearch && (
                <button 
                    onClick={handleSearch} 
                    className={`searchbar-btn ${hasSearchContent ? 'has-content' : ''}`}
                    aria-label="Search services"
                >
                    <span className="searchbar-btn-icon">🔍</span>
                    <span className="searchbar-btn-text">{t('search') || 'Search'}</span>
                </button>
            )}
        </div>
    );
}