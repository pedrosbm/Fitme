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
        const getExercices = async (id_treino: string) => {
            const { data, error } = await supabase
                .from("exercicio_treino")
                .select(`
                        *,
                        id_exercicio(
                            nome,
                            imagem
                        )
                        `)
                .eq("id_treino", id_treino)

            if (error) throw error
            setExercicios(data as ExercicioTreinoWithExercicio[])
            setLoading(false)
        }

        const id = todayWorkout?.id
        if (id) {
            getExercices(id)
        }
    }, [])

    return (
        <FlatList
            data={exercicios}
            // ListEmptyComponent={}
            renderItem={({ item }) => <Exercice item={item} />}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.1}
        />
    )
}