'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, } from 'react';
import { getCompanies, getLabs, getProducts } from '@/api';

export type Service = {
  id: string;
  title: string;
  image: string;
  type: 'doctor' | 'lab' | 'clinic' | 'technician';
};

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  addService: (service: Omit<Service, 'id'>) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSafe = async (label: string, fn: () => Promise<any>): Promise<any[]> => {
    try {
      const res = await fn();
      if (Array.isArray(res?.data)) return res?.data;
      return [];
    } catch (err: any) {
      console.log(`❌ ${label} failed`, {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
      });
      return [];
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const [products, labs, companies] = await Promise.all([
        getSafe('getProducts', () => getProducts()),
        getSafe('getLabs', () => getLabs()),
        getSafe('getCompanies', () => getCompanies()),
      ]);

      const allServices: Service[] = [];

      // Handle Products
      products.forEach((product: any) => {
        allServices.push({
          id: String(product.id),
          title: product.name || product.title || 'Unnamed Product',
          image: product.imageUrl || '/i.webp',
          type: product.isDoctor
            ? 'doctor'
            : product.isTechnician
              ? 'technician'
              : 'doctor',
        });
      });

      // Handle Labs
      labs.forEach((lab: any) => {
        allServices.push({
          id: String(lab.id),
          title: lab.name || lab.title || 'Unnamed Lab',
          image: lab.imageUrl || '/do.jpeg',
          type: 'lab',
        });
      });

      // Handle Companies
      companies.forEach((company: any) => {
        allServices.push({
          id: String(company.id),
          title: company.name || company.title || 'Unnamed Company',
          image: company.imageUrl || '/file_bwmsb.jpg',
          type: 'clinic',
        });
      });

      if (allServices.length === 0) {
        setError('No services returned from API.');
      }

      setServices(allServices);
    } catch (err) {
      setError('Unexpected error occurred while fetching services.');
    } finally {
      setLoading(false);
    }
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service, id: `${service.type}-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services, loading, error, addService }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
