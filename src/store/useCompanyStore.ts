import { create } from 'zustand'
import { createCompany, getCompanies, getCompanyById } from '@/api'

type CompanyStoreProps = {
    token: string | null,
    loading: boolean,
    error: string | null,
    loadFromStorage: () => void,
    fetchCompany: () => any
    getCompanyWithId: (companyId: string) => any
    addCompany: (companyData: any) => any
}

export const useCompanystore = create<CompanyStoreProps>((set, get) => ({
    token: null,
    loading: false,
    error: null,


    loadFromStorage: () => {
        const token = localStorage.getItem("auth");
        if (token) set({ token });
    },

    fetchCompany: async () => {
        set({ loading: true, error: null })
        try {
            const { data } = await getCompanies()
            set({ loading: false })
            return data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message || 'there are error while fetch companies' })
            }
        }
    },

    getCompanyWithId: async (companyId: string) => {
        set({ loading: true, error: null })
        try {
            const { data } = await getCompanyById(companyId)
            set({ loading: false })
            return data?.data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message })
            }
        }
    },

    addCompany: async (companyData: any) => {
        set({ loading: true, error: null })
        try {
            const { data } = await createCompany(companyData)
            set({ loading: false })
            return data?.data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message })
            }
        }
    },
}))