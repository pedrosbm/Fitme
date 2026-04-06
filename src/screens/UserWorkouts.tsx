import { SafeAreaView } from "react-native-safe-area-context"
import { useWorkout } from "../hooks/useWorkout"
import { Button, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TreinoStackNavigationProp } from "../types/Navigation"
import { useState } from "react"

export default function UserWorkouts() {
    const { treinos } = useWorkout()
    const [visible, setVisible] = useState<boolean>(false)

    const navigation = useNavigation<TreinoStackNavigationProp>()

    return (
        <SafeAreaView>
            {/* Lista de treinos */}
            {treinos.map(treino => (
                <TouchableOpacity
                    key={treino.id}
                    onPress={() => navigation.navigate("Treino", { id: treino.id })}
                >
                    <View>
                        <Text>{treino.label}</Text>
                        <Text>{treino.nome}</Text>
                    </View>
                </TouchableOpacity>
            ))}

            <Button title="Novo treino" onPress={() => setVisible(true)} />

            {visible &&
            <View style={{position: "absolute", backgroundColor: "red", alignSelf: "center"}}>
                <Text>A</Text>
                <Text>Não sei o que</Text>
                <Button title="Fechar" onPress={() => setVisible(false)}/>
            </View>
            }
        </SafeAreaView>
    )
}