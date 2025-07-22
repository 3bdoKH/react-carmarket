import axios from 'axios';
import type { Service } from '../types/service';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://carmarket-eg.online/api",
});

export const getServices = async (): Promise<Service[]> => {
    const response = await api.get<Service[]>("/services");
    return response.data;
};

export const getService = async (id: string): Promise<Service> => {
    const response = await api.get<Service>(`/services/${id}`);
    return response.data;
};
export const createService = async (serviceData: Omit<Service, '_id'>): Promise<Service> => {
    const response = await api.post<Service>('/services', serviceData);
    return response.data;
};

export const updateService = async (id: string, serviceData: Omit<Service, '_id'>): Promise<Service> => {
    const response = await api.put<Service>(`/services/${id}`, serviceData);
    return response.data;
};

export const deleteService = async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
};

export const getServicesByCategory = async (category: string): Promise<Service[]> => {
    const response = await api.get<Service[]>(`/services/category/${category}`);
    return response.data;
};