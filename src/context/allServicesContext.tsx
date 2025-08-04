'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, } from 'react';
import { createLab, getLabs, deleteLab, getLabById, getCompanies, createCompany, getHomeData } from '@/api';

type Lab = { name: string; description: string; address: string; phone_number: string; email: string; website: string; }

interface LabContextType {
    loading: boolean;
    error: string | null;
    fetchHomeData: () => any;
    fetchLabs: () => any;
    addLab: (service: Lab) => any;
    removeLab: () => any;
    getLabWithId: (labId: string) => any;
    getAllCompanies: () => any;
    addCompany: (companyForm: any) => any;
}

const AllServicesContext = createContext<any | undefined>(undefined);

export const AllServicesProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const [token, setToken] = useState<string | null>(null)

    let token = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;


    // home data
    // const fetchHomeData = async () => {
    //     if (!token) {
    //         return
    //     }
    //     setLoading(false)
    //     const { data } = await getHomeData()
    //     setLoading(true)
    //     return data?.data
    // }

    // lab services
    const fetchLabs = async () => {
        if (!token) {
            return
        }
        setLoading(true)
        const res = await getLabs()
        setLoading(false)
        return res?.data?.data
    }

    const addLab = async (service: Lab) => {
        setLoading(true)
        const { data } = await createLab(service);
        setLoading(false)
        return data?.data
    }

    const removeLab = async (id: string) => {
        setLoading(true)
        const { data } = await deleteLab(id);
        setLoading(false)
        return data?.data
    }

    const getLabWithId = async (labId: string) => {
        setLoading(true)
        const { data } = await getLabById(labId)
        setLoading(false)
        return data?.data
    };

    // company services
    const getAllCompanies = async () => {
        setLoading(true)
        const { data } = await getCompanies()
        setLoading(false)
        return data?.data
    };

    const addCompany = async (compantData: any) => {
        setLoading(true)
        const { data } = await createCompany(compantData)
        setLoading(false)
        return data?.data
    };

    // useEffect(() => {
    //     fetchLabs()
    // }, [token]);

    const contextValue = useMemo(() => ({
        loading,
        error,
        fetchLabs,
        addLab,
        removeLab,
        getLabWithId,
        getAllCompanies,
        addCompany,
        // fetchHomeData,
    }), [loading, error, fetchLabs, addLab, removeLab, getLabWithId, getAllCompanies, addCompany]);

    return (
        <AllServicesContext.Provider value={contextValue} >
            {children}
        </AllServicesContext.Provider>
    );
};

export const useAllServices = () => {
    const context = useContext(AllServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};
