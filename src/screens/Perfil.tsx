import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PerfilStackNavigationProp } from "../types/Navigation";

export default function Perfil() {
    const navigation = useNavigation<PerfilStackNavigationProp>()

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate("Detalhes")}>
                <Text>Pedro</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}