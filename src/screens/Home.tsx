import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkout } from "../hooks/useWorkout";
import { MainStack} from "../types/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<MainStack, "Home">

export default function Home({ navigation }: Props) {
    const { todayWorkout, status } = useWorkout()

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