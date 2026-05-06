import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TreinoStack } from "../../types/Navigation";
import { use, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { QueryData } from "@supabase/supabase-js";

type Props = NativeStackScreenProps<TreinoStack, "EditarExercicio">

// Página que exibe o exercicio selecionado na tela de treinos
// Aqui o usuário poderá editar como ele realiza o exercicio
export default function ExercicioEdit({ route }: Props) {
    const { id: id_exercicio } = route.params

    const [metaData, setMetaData] = useState<Metadata>()
    const [draft, setDraft] = useState<Metadata>()

    const query = supabase
        .from("exercicio_treino")
        .select(`
            id,
            repeticoes,
            series,
            descanso,
            carga,
            id_exercicio(
                nome,
                musculo_principal,
                musculo_secundario
            )
            `)
        .eq("id", id_exercicio)
        .limit(1)
        .single()

    type Metadata = QueryData<typeof query>

    useEffect(() => {
        const getExercicio = async () => {
            const { data, error } = await query

            if (error) throw error
            setMetaData(data)
        }
        getExercicio()

    }, [])

    return (
        <SafeAreaView>
            <Text>{metaData?.id_exercicio.nome}</Text>
            <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
                {metaData?.id_exercicio.musculo_principal.map((i) => (
                    <Text key={i}>{i}</Text>
                ))}
                {metaData?.id_exercicio.musculo_secundario.map((i) => (
                    <Text key={i}>{i}</Text>
                ))}
            </View>
            <Text>Séries: {metaData?.series}</Text>
            <Text>Repetições: {metaData?.repeticoes}</Text>
            <Text>Descanso: {metaData?.descanso}s</Text>
            <Text>Carga: {metaData?.carga?.join(", ") || "N/A"}</Text>

            {/* TODO modal de mudar carga, serie, repeticao e troca de exercicio */}
            <Button title="Editar" onPress={() => console.log("Modal de editar dados do exercicio_treino")} />
        </SafeAreaView>
    )
}