import { loginUser, registerUser } from '@/api'
import { create } from 'zustand'


type AuthStoreProps = {
    token: string | null,
    role: string | null,
    loading: boolean,
    error: string | null,
    loadFromStorage: () => void,
    login: (loginData: LoginProps) => any
    register: (registerData: RegisterProps) => any
    logOut: () => void
}

type LoginProps = {
    email: string,
    password: string
}

type RegisterProps = {
    email: string,
    password: string,
    user_name: string,
    phone_number: string,
    role: string,
}


export const useAuthstore = create<AuthStoreProps>((set, get) => ({
    // user: null,
    token: null,
    role: null,
    loading: false,
    error: null,


    loadFromStorage: () => {
        // const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("auth");
        const role = localStorage.getItem("role");
        if (token && role) set({ token, role });
    },

    login: async ({ email, password }: LoginProps) => {
        set({ loading: true, error: null })
        try {
            const { data }: any = await loginUser({ email, password })
            console.log(data);

            if (data.message !== "login successfully") {
                set({ loading: false })
                throw new Error("Login failed")
            }

            // localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem('auth', data?.data?.access_token?.access_token)
            localStorage.setItem('role', data?.data?.role)

            set({ token: data?.data?.access_token?.access_token, loading: false });
            return data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message || 'Login failed' })
                throw new Error(error.message || 'Login failed');
            }
        }
    },

    register: async ({ email, password, user_name, phone_number, role }: RegisterProps) => {
        set({ loading: true, error: null })
        try {
            const { data }: any = await registerUser({ email, password, user_name, phone_number, role })
            console.log(data);

            if (data.message !== "user created successfully") {
                set({ loading: false })
                throw new Error("Register failed")
            }

            // localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem('auth', data?.data?.access_token?.access_token)
            localStorage.setItem('role', data?.data?.role)

            set({ token: data?.data?.access_token?.access_token, loading: false });
            return data
        } catch (error) {
            if (error instanceof Error) {
                set({ loading: false, error: error.message || 'Login failed' })
                throw new Error(error.message || 'Login failed');
            }
        }
    },

    logOut: () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('role');
        set({ token: null, role: null });
    }
}))