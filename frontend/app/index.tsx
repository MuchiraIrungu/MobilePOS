import { Redirect } from 'expo-router'
import useAuthStore from '@/store/auth/useAuthStore'
import { useEffect } from 'react'


export default function Index() {
    const {isLoggedIn, requiresPin, checkAuth} = useAuthStore()

    useEffect(() =>{
        checkAuth()
    }, [])

    if (requiresPin){
        return <Redirect href="/(auth)/pin" />
    }

    if (isLoggedIn) {
        return <Redirect href="/(tabs)" />
    }

    return <Redirect href="/(auth)/home" />
}