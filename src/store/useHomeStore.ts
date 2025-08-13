import { getHomeData, getHomeDataById } from '@/api'
import { create } from 'zustand'


type HomeStoreProps = {
    token: string | null,
    loading: boolean,
    error: any | null,
    loadFromStorage: () => void,
    fetchHomeData: () => any
    homeDataById: (id: string) => any
}

export const useHomeStore = create<HomeStoreProps>((set, get) => ({
    token: null,
    loading: false,
    error: null,

    loadFromStorage: () => {
        const token = localStorage.getItem("auth");
        if (token) set({ token });
    },

    fetchHomeData: async () => {
        set({ loading: true, error: null })
        try {
            const { data } = await getHomeData()
            set({ loading: false })
            return data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message || 'there are error while fetch home data' })
            }
        }
    },

    homeDataById: async (id: string) => {
        set({ loading: true, error: null })
        try {
            const { data } = await getHomeDataById(id)
            set({ loading: false })
            return data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message || 'there are error while fetch home data' })
            }
        }
    }
}))