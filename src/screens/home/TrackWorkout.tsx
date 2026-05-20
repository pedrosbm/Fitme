import { View, Button } from "react-native"
import { useWorkout } from "../../hooks/useWorkout"
import { useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainStack } from "../../types/Navigation"
import ExerciceList from "../../components/ExerciceList"

type Props = NativeStackScreenProps<MainStack, "Workout">

export default function TrackWorkout({ navigation }: Props) {
    const { todayWorkout } = useWorkout()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `Treino ${todayWorkout.label}`
        })
    }, [])

    return (
        <View>
            {/* TODO passar para o próximo dia(se existir)*/}
            <Button title="Finalizar treino" onPress={() => console.log("Finalizado o treino")} />

            {/* Lista de exercicios com */}
            <ExerciceList/>
        </View>
    )
}