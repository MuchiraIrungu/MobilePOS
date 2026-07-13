import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { Image } from "expo-image";
import { BellDot, ScanBarcode, Search, Send } from "lucide-react-native";
import { BRAND } from "@/constants/colors";
import { BarcodeScanner } from "@/components/barcode/barcode-scanner";
import { useState } from "react";



export default function DashboardPage(){

    const [showScanner, setShowScanner ] = useState(false);
    const [scannedCode, setScannedCode] = useState('');
    const name = 'Collins Muchira'
    const role = 'Cashier'
    const storeName = 'James Gen Shop'
    const location = 'Nyeri Town'
    //const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`
    //const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&gender=male`

    const getInitials = (name: string) => {
        return name.split(' ').map(n =>n[0]).join('').toUpperCase()
    }

    const handleScan = (barcode: string) =>{
        setScannedCode(barcode);
        setShowScanner(false);

        //TODO: search products by barcode
        //searchProductByBarcode(barcode);
    }

    if (showScanner){
        return(
            <BarcodeScanner
                onBarcodeScan={handleScan}
                onClose={()=> setShowScanner(false)}
            />
        )
    }

    return (
        <ScrollView contentContainerClassName="flex-1 bg-white">
            <SafeAreaView className="flex" edges={['top']} style={{backgroundColor:BRAND.DARK_NAVY}}>
                <View className="px-5 py-3 mb-3 mt-2">
                    <View className="flex-row justify-between">
                        <View className=" flex-row gap-4">
                            <View className="bg-gray-200 rounded-full w-16 h-16 justify-center items-center">
                                {/*<Image source={{ uri: avatarUrl }} style={{ width: 52, height: 52, borderRadius: 26 }} />*/}
                                <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 25, color: '#1e3a5f' }}>
                                    {getInitials(name)}
                                </Text>
                            </View>
                            <View className="flex gap-1 justify-center">
                                <Text style={{ fontFamily:'Lexend_700Bold', fontSize: 20, color: '#fff'}}>{name}</Text>
                                <Text style={{fontFamily:'Lexend_400Regular', color:'#fff'}}>{role}</Text>
                            </View>
                        </View>
                        <View className="justify-center items-center">
                            <View className="justify-center items-center bg-gray-500 rounded-2xl w-14 h-14">
                                <BellDot size={20} fill={'#fff'} color={'#fff'}/>
                            </View>
                        </View>
                    </View>

                    <View className=" flex-row py-3 px-2 mt-5 gap-1">
                        <Send fill={'#fff'} color={'#fff'} size={18}/>
                        <Text style={{fontFamily:'Lexend_600SemiBold',color:'#fff'}}>{storeName}, {location}</Text>
                    </View>

                    <View className="flex-[-1] bg-black gap-4 flex-row mt-6">
                        <View className="rounded-lg bg-green-300 w-[80vw] h-14 px-4 pl-8 gap-4 justify-center items-center flex-row">
                            <Search size={20} color={'#333'} style={{ borderRadius:'30px'}}/>
                            <TextInput 
                            className="h-14 w-[98%] border-1 border-black text-start text-lg"
                            style={{fontFamily:'Lexend_600SemiBold'}}
                            placeholder="Search for products"
                            ></TextInput>
                        </View>
                        <View className="rounded-lg bg-green-300 w-[10vw] h-14 gap-2 justify-center items-center ">
                            <ScanBarcode 
                                size={17} 
                                color={'#333'} 
                                onPress={()=> setShowScanner(true)}  />
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            <View className="flex-1 p-16">
                <Text className="text-black"> Scanned: {scannedCode}</Text>
            </View>
        </ScrollView>
    )
}