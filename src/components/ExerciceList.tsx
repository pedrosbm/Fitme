import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useWorkout } from "../hooks/useWorkout";
import { supabase } from "../supabase";
import { ExercicioTreinoWithExercicio } from "../types/entities";
import Exercice from "./Exercice";

export default function ExerciceList() {
    const [exercicios, setExercicios] = useState<ExercicioTreinoWithExercicio[]>([])
    const [loading, setLoading] = useState(true)

    const { todayWorkout } = useWorkout()

    useEffect(() => {
        const getExercicies = async () => {
            const { data, error } = await supabase
                .from("exercicio_treino")
                .select(`
                        *,
                        id_exercicio(
                            nome,
                            imagem
                        )
                        `)
                .eq("id_treino", todayWorkout.id)

            if (error) throw error
            setExercicios(data as ExercicioTreinoWithExercicio[])
            setLoading(false)
        }

        if (todayWorkout?.id) {
            getExercicies()
        }
    }, [todayWorkout?.id])

    return (
        <FlatList
            data={exercicios}
            renderItem={({ item }) => <Exercice item={item} />}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.1}
        />
    )
}