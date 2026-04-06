import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkout } from "../hooks/useWorkout";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigationProp } from "../types/Navigation";
import { useEffect, useState } from "react";
import { treino } from "../types/entities";

export default function Home() {
    const { todayWorkout, status} = useWorkout()

    const navigation = useNavigation<MainStackNavigationProp>()

    return (
        <>
            <SafeAreaView>
                <Text>Olá Pedro</Text>

                {/* TODO navegar para workout real */}
                {todayWorkout !== undefined && (
                    <TouchableOpacity onPress={() => navigation.navigate("Workout", { id: "1" })}>
                        <View>
                            {/* Label + status do treino do dia */}
                            <Text>{todayWorkout.label}</Text>
                            <Text>{status}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </SafeAreaView>
        </>
    )
}