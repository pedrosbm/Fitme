import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TreinoStack } from "../../types/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useWorkout } from "../../hooks/useWorkout";
import { useEffect, useState } from "react";
import { Treino } from "../../types/entities";
import { supabase } from "../../supabase";
import { QueryData } from "@supabase/supabase-js";

type Props = NativeStackScreenProps<TreinoStack, "Treino">

export default function Workout({ route, navigation }: Props) {
    // Dados da página
    const [metaData, setMetaData] = useState<Treino>()
    const [exercicios, setExercicios] = useState<exerciciosJoin>()

    // ID do Treino
    const { id: idTreino } = route.params

    // Carrega metadados dos treinos armazenados localmente
    const { treinos } = useWorkout()
    useEffect(() => {
        if (idTreino) {
            const meta = treinos.find(i => i.id === idTreino)
            setMetaData(meta)
        }
    }, [idTreino, treinos])

    // Header
    useEffect(() => {
        if (metaData) {
            navigation.setOptions({ title: "Treino " + metaData?.label })
        }
    }, [metaData, navigation])

    // TODO modularizar regra de negócio para componentes separados 
    const query = supabase
        .from("exercicio_treino")
        .select(`
            id,
            id_treino,
            id_exercicio (
                nome,
                imagem,
                musculo_principal
            ),
            ordem,
            series,
            repeticoes
        `)
        .eq("id_treino", idTreino)
        .order("ordem", { ascending: true })

    type exerciciosJoin = QueryData<typeof query>

    useEffect(() => {
        const getExercicios = async () => {
            const { data, error } = await query

            if (error) throw error
            setExercicios(data)
        }
        getExercicios()

    }, [])

    return (
        <SafeAreaView>
            <Button title="Novo exercicio" onPress={() => navigation.navigate("NovoExercicio", { id: idTreino })} />

            <Text>Treino {metaData?.label}</Text>

            <FlatList ListEmptyComponent={<Text>Vazio</Text>} data={exercicios} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate("EditarExercicio", { id: item.id })}>
                    <View key={item.id}>
                        <Text>{item.id_exercicio.nome}</Text>
                    </View>
                </TouchableOpacity>
            )} />
        </SafeAreaView>
    )
}