'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, } from 'react';
import { createLab, getCompanies, getLabs, getProducts } from '@/api';

export type Service = {
  id: string;
  title: string;
  image: string;
  type: 'doctor' | 'lab' | 'clinic' | 'technician' | 'company';
};

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  // addService: (service: any) => void;
  // getServiceById: (serviceId: string) => void;
  // fetchServices: () => void;
  // fetchLabs: () => any;
  // fetchCompanies: () => any;
  // fetchDoctors: () => any;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  let token = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;

  // const getSafe = async (label: string, fn: () => Promise<any>): Promise<any[]> => {
  //   try {
  //     const res = await fn();
  //     if (Array.isArray(res?.data?.data)) return res?.data?.data;
  //     return [];
  //   } catch (err: any) {
  //     console.log(`❌ ${label} failed`, {
  //       message: err?.message,
  //       status: err?.response?.status,
  //       data: err?.response?.data,
  //     });
  //     return [];
  //   }
  // };

  // const fetchLabs = async () => {
  //   if (!token) {
  //     return
  //   }
  //   const res = await getLabs()
  //   return res?.data?.data
  // }

  // const fetchCompanies = async () => {
  //   if (!token) {
  //     return
  //   }
  //   const res = await getCompanies()
  //   return res?.data?.data
  // }

  // const fetchServices = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const [products, labs, companies] = await Promise.all([
  //       getSafe('getProducts', () => getProducts()),
  //       getSafe('getLabs', () => getLabs()),
  //       getSafe('getCompanies', () => getCompanies()),
  //     ]);

  //     const allServices: any[] = [];

  //     // Handle Products
  //     products.forEach((product: any) => {
  //       allServices.push({
  //         ...product,
  //         image: product.imageUrl || '/i.webp',
  //         type: product.isDoctor
  //           ? 'doctor'
  //           : product.isTechnician
  //             ? 'technician'
  //             : 'doctor',
  //       });
  //     });

  //     // Handle Labs
  //     labs.forEach((lab: any) => {
  //       allServices.push({
  //         ...lab,
  //         image: lab.imageUrl || '/do.jpeg',
  //         type: 'lab',
  //       });
  //     });

  //     // Handle Companies
  //     companies.forEach((company: any) => {
  //       allServices.push({
  //         ...company,
  //         image: company.imageUrl || '/file_bwmsb.jpg',
  //         type: 'company',
  //       });
  //     });

  //     if (allServices.length === 0) {
  //       setError('No services returned from API.');
  //     }

  //     setServices(allServices);
  //   } catch (err) {
  //     setError('Unexpected error occurred while fetching services.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const addService = async (service: any) => {
  //   const { data } = await createLab(service);
  //   // await fetchServices();
  //   setServices((prev) => [...prev, data]);
  // };

  // const getServiceById = async (serviceId: string) => {
  //   services.filter((service) => service.id === serviceId)
  // };

  useEffect(() => {
    // fetchServices();
    // fetchLabs()
  }, [token]);

  const contextValue = useMemo(() => ({
    services,
    loading,
    error,
    // addService,
    // getServiceById,
    // fetchServices,
    // fetchLabs,
    // fetchCompanies
  }), [services, loading, error]);

  return (
    <ServicesContext.Provider value={contextValue}>
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
