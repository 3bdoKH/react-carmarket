export type ServiceCategory = 'repair' | 'carwash' | 'spray' | 'spare parts' | 'tires' | 'accessorize' | 'showroom'

export interface Service {
    _id: string;
    name: string;
    address: string;
    city: string;
    contact: string[];
    description : string;
    category: ServiceCategory;
    servicesOffered: string[];
    images?: string[];
    logo?: string; 
    location: string;
    social : string[];
}