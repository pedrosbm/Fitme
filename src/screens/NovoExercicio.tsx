import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { exercicio } from "../types/entities";
import { useNavigation } from "@react-navigation/native";
import { TreinoStackNavigationProp } from "../types/Navigation";

export default function NovoExercicio() {
    const [exercicios, setExercicios] = useState<exercicio[]>([{
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "nome": "Supino reto (barra)",
        "imagem": "",
        "musculo_principal": [
            "Peitoral maior"
        ],
        "musculo_secundario": [
            "Deltoide anterior",
            "Tríceps"
        ],
        "descricao": "Exercício fundamental para o desenvolvimento do peitoral, realizado em um banco plano com uma barra.",
        "tutorial": [
            "Deite-se no banco com os pés firmes no chão.",
            "Segure a barra com as mãos um pouco além da largura dos ombros.",
            "Abaixe a barra controladamente até tocar o meio do peito.",
            "Empurre a barra de volta à posição inicial, estendendo os cotovelos."
        ],
        "exemplos": []
    }])

    const navigation = useNavigation<TreinoStackNavigationProp>()

    return (
        <SafeAreaView>
            <View>
                {exercicios.map((i) => (
                    <TouchableOpacity
                        key={i.id}
                        onPress={() => alert("adicionado")}
                    >
                        <View >
                            <Text>{i.nome}</Text>
                            {i.musculo_principal.map(musculo => (<Text key={musculo}>{musculo}</Text>))}
                            {i.musculo_secundario.map(musculo => (<Text key={musculo}>{musculo}</Text>))}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )
}