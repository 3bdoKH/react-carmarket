import Fuse from 'fuse.js';
import type { Service } from '../types/service';

// Configure Fuse.js options for Arabic and English search
const fuseOptions = {
    // Keys to search in, with weights
    keys: [
        { name: 'name', weight: 2 },       // Service name (most important)
        { name: 'description', weight: 1 }, // Service description
        { name: 'city', weight: 1.5 },     // City (important for location search)
        { name: 'servicesOffered', weight: 1 }, // Services offered
        { name: 'address', weight: 0.5 },  // Address
    ],
    // Fuse.js configuration
    includeScore: true,     // Include score in results
    threshold: 0.4,         // Lower threshold for better matching (0.0 is exact match)
    ignoreLocation: true,   // Important for Arabic - don't rely on character location
    useExtendedSearch: true, // Enable extended search for more complex queries
    findAllMatches: true,   // Find all matches in a string, not just the first
    minMatchCharLength: 2,  // Minimum length of characters to match
    shouldSort: true,       // Sort by score
    // Arabic-specific options
    distance: 100,          // Allow more distance between characters for Arabic
    tokenize: true,         // Tokenize the search string and text
    matchAllTokens: false,  // Match any token (better for Arabic)
};

/**
 * 
 * 
 * Create a Fuse.js instance for searching services
 * @param services Array of services to search
 * @returns Fuse instance configured for Arabic search
 */
export const createSearchIndex = (services: Service[]): Fuse<Service> => {
    return new Fuse(services, fuseOptions);
};

/**
 * Search services using Fuse.js
 * @param searchTerm Search term (can be in Arabic or English)
 * @param fuse Fuse instance to use for searching
 * @param limit Optional limit for results
 * @returns Array of matching services
 */
export const searchServices = (
    searchTerm: string,
    fuse: Fuse<Service>,
    limit?: number
): Service[] => {
    if (!searchTerm.trim()) {
        return [];
    }

    // Perform the search
    const results = fuse.search(searchTerm);

    // Extract just the items from the results
    const matchedServices = results.map(result => result.item);

    // Apply limit if specified
    return limit ? matchedServices.slice(0, limit) : matchedServices;
};

/**
* Filter services by category and/or city after fuzzy search
* @param services Services to filter
* @param category Optional category to filter by
* @param city Optional city to filter by
* @returns Filtered services
*/
export const filterServices = (
    services: Service[],
    category?: string,
    city?: string
): Service[] => {
    return services.filter(service => {
        // Filter by category if specified
        const categoryMatch = !category || service.category === category;

        // Filter by city if specified (case insensitive)
        const cityMatch = !city ||
            service.city.toLowerCase().includes(city.toLowerCase());

        return categoryMatch && cityMatch;
    });
};

/**
* Perform a complete search with filtering
* @param searchTerm Search term
* @param services All available services
* @param category Optional category filter
* @param city Optional city filter
* @returns Matched and filtered services
*/
export const performCompleteSearch = (
    searchTerm: string,
    services: Service[],
    category?: string,
    city?: string
): Service[] => {
    // Create search index
    const fuse = createSearchIndex(services);

    // If no search term but we have filters, just filter the services
    if (!searchTerm.trim() && (category || city)) {
        return filterServices(services, category, city);
    }

    // If we have a search term, search first then filter
    if (searchTerm.trim()) {
        const searchResults = searchServices(searchTerm, fuse);
        return filterServices(searchResults, category, city);
    }

    // If no search term and no filters, return all services
    return services;
};
