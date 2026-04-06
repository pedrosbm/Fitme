import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TreinoStack } from "../types/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useWorkout } from "../hooks/useWorkout";
import { useEffect, useState } from "react";
import { exercicio_treino, treino } from "../types/entities";

type Props = NativeStackScreenProps<TreinoStack, "Treino">

export default function Workout({ route, navigation }: Props) {
    // Dados da página
    const [metaData, setMetaData] = useState<treino>()
    const [exercicios, setExercicios] = useState<exercicio_treino[]>()

    // ID do Treino
    const { id } = route.params

    // Carrega metadados dos treinos armazenados localmente
    const { treinos } = useWorkout()
    useEffect(() => {
        if (id) {
            const meta = treinos.find(i => i.id === id)
            setMetaData(meta)
        }
    }, [id, treinos])

    // Header
    useEffect(() => {
        if (metaData) {
            navigation.setOptions({ title: "Treino " + metaData?.label })
        }
    }, [metaData, navigation])

    // TODO buscar exercicios do treino correspondente
    useEffect(() => {
        
    }, [])

    return (
        <SafeAreaView>
            <Button title="Novo exercicio" onPress={() => navigation.navigate("NovoExercicio", { id })} />

            <TouchableOpacity onPress={() => navigation.navigate("EditarExercicio", { id: "1" })}>
                <Text>Treino {metaData?.label}</Text>

                <FlatList data={exercicios} renderItem={({ item }) => (
                    <View key={item.id}>
                        <Text>{item.id_exercicio}</Text>
                        <Text>{item.series} Series</Text>
                        <Text>{item.repeticoes} Repetições</Text>
                    </View>
                )} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}