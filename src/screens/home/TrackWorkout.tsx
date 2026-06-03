import { View, Button } from "react-native"
import { useWorkout } from "../../hooks/useWorkout"
import { useEffect, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainStack } from "../../types/Navigation"
import ExerciceList from "../../components/ExerciceList"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useExerciceTracking } from "../../hooks/useExerciceTracking"

type Props = NativeStackScreenProps<MainStack, "Workout">

export default function TrackWorkout({ navigation }: Props) {
    const { todayWorkout, day, treinos, setDay } = useWorkout()
    const { clearAllExercices } = useExerciceTracking()
    const [modal, setModal] = useState<boolean>(false)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `Treino ${todayWorkout?.label}`
        })
    }, [])

    const finishWorkout = async () => {
        if (day + 1 < treinos.length) {
            setDay(previous => previous + 1)
        } else {
            setDay(0)
        }

        await clearAllExercices()

        navigation.goBack()
    }

    return (
        <View>
            {/* TODO passar para o próximo dia(se existir)*/}
            <Button title="Finalizar treino" onPress={finishWorkout} />

            {/* Lista de exercicios */}
            <ExerciceList />
        </View>
    )
}