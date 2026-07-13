import { create } from "zustand";
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';

//const { MMKV } = require('react-native-mmkv');
//const storage = new MMKV({ id: 'auth-storage' });
const BASE_URL = 'http://192.168.1.151:8000/api/users/'

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
    isOffline: boolean;
    requiresPin: boolean;
    login: (credentials: Record<string, unknown>) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refresh: () => Promise<{ success: boolean; offline?: boolean }>;
    setupPin: (pin: string) => Promise<void>;
    loginWithPin: (enteredPin: string) => Promise<{ success: boolean; error?: string }>;
    checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    isOffline: false,
    requiresPin: false,

    login: async (credentials) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`${BASE_URL}login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })
            const data = await response.json()
            if (!response.ok) throw new Error((data && data.detail) || 'Login failed')
            
            const payload = data.data
            await AsyncStorage.clear()
            await AsyncStorage.setItem('token', payload.access)
            await AsyncStorage.setItem('refreshToken', payload.refresh)
            await AsyncStorage.setItem('user', JSON.stringify(payload.user))
            const role = await AsyncStorage.setItem('role', payload.user.role)
            console.log(payload.user.role)

            set({
                user: payload.user,
                token: payload.access,
                refreshToken: payload.refresh,
                isLoggedIn: true,
                loading: false,
            })
            return { success: true }
        } catch (error: any) {
            set({ error: error?.message ?? String(error), loading: false })
            return { success: false, error: error?.message ?? String(error) }
        }
    },

    setupPin: async (pin: string) => {
       await AsyncStorage.setItem('userPin', pin)
    },

    loginWithPin: async (enteredPin: string) => {
        const storedPin = await AsyncStorage.getItem('userPin')
        const storedToken = await AsyncStorage.getItem('token')
        const storedUser = await AsyncStorage.getItem('user')

        if (!storedPin || !storedToken) {
            return { success: false, error: 'No PIN set. Please login online first.' }
        }
        if (enteredPin !== storedPin) {
            return { success: false, error: 'Incorrect PIN' }
        }

        set({
            user: storedUser ? JSON.parse(storedUser) : null,
            token: storedToken,
            refreshToken: await AsyncStorage.getItem('refreshToken') ?? null,
            isLoggedIn: true,
            isOffline: true,
            requiresPin: false,
        })
        return { success: true }
    },

    checkAuth: async () => {
        const storedToken = await AsyncStorage.getItem('token')
        const storedUser = await AsyncStorage.getItem('user')
        const storedPin = await AsyncStorage.getItem('userPin')

        if (!storedToken || !storedUser) {
            set({ isLoggedIn: false })
            return
        }

        const netState = await NetInfo.fetch()

        if (!netState.isConnected) {
            if (storedPin) {
                set({ requiresPin: true })
            } else {
                set({ isLoggedIn: false })
            }
            return
        }

        set({
            user: JSON.parse(storedUser),
            token: storedToken,
            refreshToken: await AsyncStorage.getItem('refreshToken') ?? null,
        })
        await get().refresh()
    },

    logout: async () => {
        const { refreshToken } = get()
        try {
            await fetch(`${BASE_URL}logout/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
            })
        } catch (error: any) {
            console.log('Logout error:', error)
        } finally {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('refreshToken')
            await AsyncStorage.removeItem('user')
            set({
                user: null,
                token: null,
                refreshToken: null,
                isLoggedIn: false,
                isOffline: false,
                requiresPin: false,
            })
        }
    },

    refresh: async () => {
        const { refreshToken } = get()
        try {
            const response = await fetch(`${BASE_URL}token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
            })
            const data = await response.json()
            if (!response.ok) throw new Error('Token refresh failed')

            await AsyncStorage.setItem('token', data.access)
            set({ token: data.access })
            return { success: true }
        } catch (error: any) {
            const netState = await NetInfo.fetch()
            if (!netState.isConnected) {
                set({ requiresPin: true })
                return { success: false, offline: true }
            }
            get().logout()
            return { success: false }
        }
    },
}))

export default useAuthStore;