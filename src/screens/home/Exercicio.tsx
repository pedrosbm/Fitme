import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStack } from "../../types/Navigation";
import { QueryData } from "@supabase/supabase-js";

type Props = NativeStackScreenProps<MainStack, "Exercicio">

// TODO Resolver problema de disputa de nomes das tipagens e telas/ melhorar nomenclaturas 
export default function Exercicio({ route }: Props) {
    const [data, setData] = useState<Data>()

    const { id } = route.params

    const query = supabase
        .from("exercicio_treino")
        .select(`
            *,
            id_exercicio(
                nome,
                imagem,
                musculo_principal,
                musculo_secundario
            )
            `)
        .eq("id", id)
        .limit(1)
        .single()

    type Data = QueryData<typeof query>

    useEffect(() => {
        const getExercicio = async () => {
            const { data, error } = await query

            if (error) throw error
            setData(data)
        }
        getExercicio()
    }, [])

    return (
        <SafeAreaView>
            <View>
                {/* TODO 2 incluir imagem */}
                {/* Informações */}
                <View>
                    <View>
                        <Text>nome</Text>
                        <Text>{data?.id_exercicio.nome}</Text>
                    </View>

                    <View>
                        <Text>{data?.series} series</Text>
                        <Text>{data?.repeticoes} repeticoes</Text>
                    </View>
                </View>

                {/* Musculos */}
                <View>
                    <View>
                        {data?.id_exercicio.musculo_principal.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </View>

                    <View>
                        {data?.id_exercicio.musculo_secundario.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </View>
                </View>

                {/* TODO cronômetro que funciona em segundo plano */}
                <Button title={String(data?.descanso)} />
            </View>
        </SafeAreaView>
    )
}