import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkout } from "../hooks/useWorkout";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigationProp } from "../types/Navigation";

export default function Home() {
    const { day, treinos } = useWorkout()

    const navigation = useNavigation<MainStackNavigationProp>()

    return (
        <>
            <SafeAreaView>
                <Text>Olá Pedro</Text>

                {/* TODO navegar para workout real */}
                {day !== undefined && (
                    <TouchableOpacity onPress={() => navigation.navigate("Workout", { id: "1" })}>
                        <View>
                            {/* Label + status do treino do dia */}
                            <Text>{treinos[day].label}</Text>
                            <Text>Não iniciado</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </SafeAreaView>
        </>
    )
}