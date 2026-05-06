import { FlatList, View, Text, Button } from "react-native"
import { useWorkout } from "../../hooks/useWorkout"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import { QueryData } from "@supabase/supabase-js"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainStack } from "../../types/Navigation"

type Props = NativeStackScreenProps<MainStack, "Workout">

export default function TrackWorkout({ navigation }: Props) {
    const [exercicios, setExercicios] = useState<Payload>()

    const { todayWorkout } = useWorkout()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `Treino ${todayWorkout.label}`
        })
    }, [])

    // TODO 2 modularizar regra de negócio 
    const query = supabase
        .from("exercicio_treino")
        .select(`
            *,
            id_exercicio(
                nome,
                imagem
            )
            `)
        .eq("id_treino", todayWorkout.id)
    type Payload = QueryData<typeof query>

    useEffect(() => {
        const getExercicies = async () => {
            const { data, error } = await query

            if (error) throw error
            setExercicios(data)
        }
        getExercicies()
    }, [])

    return (
        <View>
            <FlatList data={exercicios} renderItem={({ item }) => (
                <View key={item.id}>
                    <Text>{item.id_exercicio.nome}</Text>
                    <View style={{ flexDirection: "row", gap: 5, width: "100%" }}>
                        <Text>{item.series}</Text>
                        <Text>{item.repeticoes}</Text>
                    </View>
                </View>
            )} />

            {/* TODO passar para o próximo dia(se existir)*/}
            <Button title="Finalizar treino" onPress={() => console.log("Finalizado o treino")} />
        </View>
    )
}