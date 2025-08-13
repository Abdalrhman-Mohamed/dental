import { create } from 'zustand'
import { createLab, getLabById, getLabs } from '@/api'

type LabStoreProps = {
    token: string | null,
    loading: boolean,
    error: string | null,
    loadFromStorage: () => void,
    fetchLab: () => any
    getLabWithId: (labId: string) => any
    addLab: (labData: any) => any
}

export const useLabstore = create<LabStoreProps>((set, get) => ({
    token: null,
    loading: false,
    error: null,


    loadFromStorage: () => {
        const token = localStorage.getItem("auth");
        if (token) set({ token });
    },

    fetchLab: async () => {
        set({ loading: true, error: null })
        try {
            const { data } = await getLabs()
            set({ loading: false })
            return data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message || 'there are error while fetch labs' })
            }
        }
    },

    getLabWithId: async (labId: string) => {
        set({ loading: true, error: null })
        try {
            const { data } = await getLabById(labId)
            set({ loading: false })
            return data?.data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message })
            }
        }
    },

    addLab: async (labData: any) => {
        set({ loading: true, error: null })
        try {
            const { data } = await createLab(labData);
            console.log(data);
            set({ loading: false })
            return data?.data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message })
            }
        }
    },
}))