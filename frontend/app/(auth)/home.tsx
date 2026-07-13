import { ScrollView, Text ,TouchableOpacity,View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TEXT,COLORS, BRAND } from "@/constants/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Barcode, Box, CheckCheck, GlobeOff, Users } from "lucide-react-native";



export default function HomePage(){
    const router = useRouter()
    return(
        <ScrollView 
            className="flex-1"
            style={{backgroundColor:COLORS.BRAND.LIGHT_BACKGROUND}}
        >
            <SafeAreaView className="flex justify-center items-center " edges={['top']}>
                <View className="justify-center items-center  mt-10 mr-10">
                    <Image 
                        source={require('@/assets/images/pos_system_logo .png')}
                        style={{width: 390, height:200,}}
                        contentFit="contain"
                    ></Image>
                </View>

                <View 
                    className=" w-[90vw] rounded-3xl pl-10 gap-2"
                    style={{backgroundColor:BRAND.DARK_NAVY}}
                >
                    <View className=" flex-row items-start justify-between px-10 py-5 mt-6">
                        <Box size={20} fill={'#333'} color={'#fff'}/>
                        <Text style={{fontFamily:'Lexend_500Medium', fontSize:20, color:TEXT.DISABLED }}>Inventory Tracking</Text>
                        <CheckCheck size={20} fill={'#333'} color={'#fff'} />    
                    </View>

                    <View className=" flex-row items-center justify-between px-10 py-5 ">
                        <Users size={20} fill={'#333'} color={'#fff'}/>
                        <Text style={{fontFamily:'Lexend_500Medium', fontSize:20, color:TEXT.DISABLED }}>Staff Management</Text>  
                        <CheckCheck size={20} fill={'#333'} color={'#fff'} />    
                    </View>

                    <View className=" flex-row items-start justify-between px-10 py-5 text-start">
                        <GlobeOff size={20} fill={'#333'} color={'#fff'}/>
                        <Text style={{fontFamily:'Lexend_500Medium', fontSize:20, color:TEXT.DISABLED }}>Offline Enabled</Text> 
                        <CheckCheck size={20} fill={'#333'} color={'#fff'} />     
                    </View>

                    <View className=" flex-row items-center  justify-between px-10 py-5 mb-6 ">
                        <Barcode size={20} fill={'#333'} color={'#fff'}/>
                        <Text style={{fontFamily:'Lexend_500Medium', fontSize:20, color:TEXT.DISABLED }}>Fast Barcode Checkout</Text> 
                        <CheckCheck size={20} fill={'#333'} color={'#fff'} />     
                    </View>
                </View>

                <Text 
                    className="text-center mt-6"
                    style={{fontFamily:'Lexend_500Medium', fontSize: 19, color:TEXT.SECONDARY}}
                > Retail solutions for Kenyan shops</Text>

                <View className="justify-center items-center mt-20 gap-4">
                    <TouchableOpacity 
                        className="w-[90vw] h-[60px] rounded-[40px] justify-center items-center"
                        style={{backgroundColor:BRAND.DARK_NAVY}} 
                        onPress={() => router.push('/(auth)/register')}
                    >
                        <Text 
                            style={{ color: TEXT.DISABLED, fontFamily:'Lexend_600SemiBold', fontSize: 20}}
                        > Sign Up</Text>
                    </TouchableOpacity>

                   <TouchableOpacity 
                        className="w-[90vw] h-[60px] rounded-[40px] justify-center items-center border-['##1e3a5f] border-2"
                        style={{backgroundColor:BRAND.LIGHT_BACKGROUND}} 
                        onPress={()=> router.push('/(auth)/login')}
                    >
                        <Text 
                            style={{ color: TEXT.PRIMARY, fontFamily:'Lexend_600SemiBold', fontSize: 20}}
                        > Log In</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>

        </ScrollView>
    )
}