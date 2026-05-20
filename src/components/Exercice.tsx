import { View, TouchableOpacity, Switch, Text } from "react-native";
import { MainStackNavigationProp } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { ExercicioTreinoWithExercicio } from "../types/entities";
import { useExerciceTracking } from "../hooks/useExerciceTracking";

interface ExerciceProps {
    item: ExercicioTreinoWithExercicio;
}

export default function Exercice({ item }: ExerciceProps) {
    const navigation = useNavigation<MainStackNavigationProp>();
    const { isExerciseComplete, markAsComplete, markAsIncomplete } = useExerciceTracking();

    const checked = isExerciseComplete(item.id);

    const handleToggle = async (value: boolean) => {
        if (value) {
            await markAsComplete(item.id);
        } else {
            await markAsIncomplete(item.id);
        }
    };

    return (
        <View key={item.id}>
            <TouchableOpacity onPress={() => navigation.navigate("Exercicio", { id: item.id })}>
                <Text>{item.id_exercicio?.nome}</Text>
                <View style={{ flexDirection: "row", gap: 5, width: "100%" }}>
                    <Text>{item.series}</Text>
                    <Text>{item.repeticoes}</Text>
                </View>
            </TouchableOpacity>

            <Switch value={checked} onValueChange={handleToggle} />
        </View>
    );
}