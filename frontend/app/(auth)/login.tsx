import { useNavigation, useRouter } from "expo-router";
import { View, Text, ScrollView,TouchableOpacity,TextInput, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from 'lucide-react-native'
import { Image } from "expo-image";
import { useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import useAuthStore from "@/store/auth/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BRAND, BUTTON_COLORS, SURFACES, TEXT } from "@/constants/colors";


export default function LoginScreen(){

    const navigation = useNavigation()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, loading, error} = useAuthStore()

    const handleLogin = async () =>{
        if(!email || !password){
            Alert.alert('Error', 'Please enter your email and password')
            return
        }
        const result = await login({ email, password})
        if(result.success) {
            const hasPin = await AsyncStorage.getItem('userPin')

            if(!hasPin) {
                router.replace('/(auth)/setup-pin')
            } 
            const role = await AsyncStorage.getItem('role')
            if (role === 'shop_attendant'){
                router.replace('/(tabs)/(attendant)')
            }else{
                router.replace('/(tabs)/explore')
            }
            
        }else{
            Alert.alert('Login Failed', result.error ?? 'Something went wrong')
        }
    }

    return(
        <ScrollView contentContainerClassName="flex-1 bg-[#EBF4FF]">
            <SafeAreaView className="flex " edges={['top']}>
                <View className="flex-row justify-between items-center px-5 pt-2">
                    <TouchableOpacity
                        onPress={()=> navigation.goBack()}
                        className="bg-blue-300 p-2 rounded-tr-2xl rounded-bl-2xl"
                    >
                        <ArrowLeft size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Lexend_400Regular', fontSize: 14, color: '#93c5fd' }}>
                        Need help?
                    </Text>
                </View>
                <View className="flex-row justify-center mt-2 mb-2 mr-6 ">
                    <Image source={require('@/assets/images/pos_system_logo .png')}
                      style={{width: 700, height: 220}}
                      contentFit="contain"></Image>
                </View>
            </SafeAreaView>

            <View className="flex-1 px-8 pt-12 pb-12"
                  style={{borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor:BRAND.DARK_NAVY}}
            >
                <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 28, color:TEXT.DISABLED, marginBottom: 4 }}>
                    Welcome back
                </Text>
                <Text style={{ fontFamily: 'Lexend_300Light', fontSize: 15, color: TEXT.DISABLED, marginBottom: 32 }}>
                    Log in to your account
                </Text>

                <View className="gap-6">
                    <View className="gap-1">
                        <Text style={{ fontFamily: 'Lexend_500Medium', fontSize: 16, color:TEXT.DISABLED }}>
                            Email
                        </Text>
                        <TextInput
                        placeholder="your@email.com"
                        placeholderTextColor="rgba(30,58,95,0.5)"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="border-b-2 border-white py-3 text-lg bg-white rounded-[12px] px-3 shadow-gray-600 shadow-sm "
                        style={{fontFamily:'Lexend_400Regular'}}
                        />
                    </View>

                    <View className="gap-1">
                        <View className=" flex-row justify-between ">
                            <Text style={{ fontFamily: 'Lexend_500Medium', fontSize: 16, color: TEXT.DISABLED }}>
                                Password
                            </Text>

                            <TouchableOpacity className="items-end ">
                                <Text style={{ fontFamily: 'Lexend_400Regular', fontSize: 14, color:TEXT.DISABLED}}>
                                    Forgot password?
                                </Text>
                            </TouchableOpacity>
                        </View>
        
                        <TextInput
                        placeholder="••••••••"
                        placeholderTextColor="rgba(30,58,95,0.5)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="border-b-2 border-12 border-white py-3 bg-white px-3 shadow-gray-600 rounded-[12px] shadow-sm text-xl "
                        style={{fontFamily:'Lexend_400Regular'}}
                        />
                    </View>

                    {error && (
                        <Text style={{ fontFamily: 'Lexend_400Regular', fontSize: 14, color: '#dc2626' }}>
                            {error}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        className="w-full bg-[#1a4fbf] rounded-full py-4 items-center mt-4"
                        style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        backgroundColor: BUTTON_COLORS.SECONDARY.background,
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 5,
                        }}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 17, color: BUTTON_COLORS.SECONDARY.text }}>
                                Log in
                            </Text>
                        )}
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-3 mt-2">
                        <View className="flex-1" style={{ height: 1, backgroundColor: SURFACES.BORDER }} />
                        <Text style={{ fontFamily: 'Lexend_400Regular', fontSize: 14, color: BUTTON_COLORS.PRIMARY.disabled }}>
                            or continue with
                        </Text>
                        <View className="flex-1" style={{ height: 1, backgroundColor: SURFACES.BORDER }} />
                    </View>

                    <View className="justify-center gap-6 flex-row">
                        <TouchableOpacity
                          className="bg-blue-50 rounded-2xl items-center justify-center flex"
                          style={{ width: 70, height: 56, elevation:3, shadowColor:'#000',shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }}
                        >
                            <FontAwesome name="google" size={28} color="#EA4335" />
                            <Text style={{ fontFamily: 'Lexend_400Regular', fontSize: 14, color: 'rgba(30,58,95,0.85)' }}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="bg-blue-50 rounded-2xl items-center justify-center"
                          style={{ width: 70, height: 56, elevation:3, shadowColor:'#000',shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }}
                        >
                            <FontAwesome name="apple" size={30} color="#1a1a1a" />
                            <Text style={{ fontFamily: 'Lexend_400Regular', fontSize: 14, color: 'rgba(30,58,95,0.85)' }}>Apple</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row justify-center items-center py-8 ">
                    <Text style={{ fontFamily: 'Lexend_400Regular', fontSize: 15, color: TEXT.DISABLED }}>
                        Don &apos;t have an account?{' '}
                    </Text>
                    <TouchableOpacity>
                        <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 15, color: '#60a5fa' }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}