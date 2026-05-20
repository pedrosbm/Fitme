import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkout } from "../../hooks/useWorkout";
import { MainStack } from "../../types/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

type Props = NativeStackScreenProps<MainStack, "Home">

export default function Home({ navigation }: Props) {
    const { todayWorkout, inProgress } = useWorkout()

    return (
        <>
            <SafeAreaView>
                <Text>Olá Pedro</Text>

                {todayWorkout !== undefined && (
                    <TouchableOpacity onPress={() => navigation.navigate("Workout", { id: todayWorkout.id })}>
                        <View>
                            {/* Label + status do treino do dia */}
                            <Text>{todayWorkout.label}</Text>
                            <Text>{todayWorkout.nome}</Text>
                            <Text>{inProgress ? "Em Progresso" : "Não iniciado"}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </SafeAreaView>
        </>
    )
}