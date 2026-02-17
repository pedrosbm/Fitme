import { useNavigation } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TreinoStackNavigationProp } from "../types/Navigation";

export default function Treino() {
    const navigation = useNavigation<TreinoStackNavigationProp>()

    return(
        <SafeAreaView>
            <Button title="Novo exercicio" onPress={() => navigation.navigate("NovoExercicio")}/>

            <TouchableOpacity onPress={() => navigation.navigate("EditarExercicio", {id: "1"})}>
                <Text>Supino reto</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}