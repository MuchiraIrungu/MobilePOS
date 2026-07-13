import { View } from "lucide-react-native";
import { ScrollView, TouchableOpacity, Text } from "react-native";

export default function Permission(){
    return(
        <ScrollView>
            <View>
                <TouchableOpacity>
                    <Text>Add new product</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text> Checkout product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}