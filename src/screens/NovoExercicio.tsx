import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Exercicio, ExercicioTreino } from "../types/entities";
import { TreinoStack } from "../types/Navigation";
import { supabase } from "../supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<TreinoStack, "NovoExercicio">

export default function NovoExercicio({ navigation, route }: Props) {
    const { id } = route.params

    // Exercicio selecionado
    const [exercicio, setExercicio] = useState<ExercicioTreino>()

    // Exercicios do sistema
    const [exercicios, setExercicios] = useState<Exercicio[]>()

    // Query de exercicios do sistema
    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from("exercicio").select()

            if (data != null) {
                setExercicios(data)
            }
        }
        fetch()
    }, [])

    const add = (item: Exercicio) => {
        const { id: idExercicio } = item

    }   

    return (
        <SafeAreaView>
            <FlatList data={exercicios} renderItem={({ item }) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => adicionar(item)}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10, padding: 10, backgroundColor: "red" }}>
                        <Text>{item.nome}</Text>
                        <View>
                            {item.musculo_principal.map(musculo => (<Text key={musculo}>{musculo}</Text>))}
                            {item.musculo_secundario.map(musculo => (<Text key={musculo}>{musculo}</Text>))}
                        </View>
                    </View>
                </TouchableOpacity>
            )} />
        </SafeAreaView>
    )
}