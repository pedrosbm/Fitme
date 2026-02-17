import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Treinos from "../screens/Treinos"
import { TreinoStack as Stack } from "../types/Navigation"
import ExercicioEdit from "../screens/ExercicioEdit"
import NovoExercicio from "../screens/NovoExercicio"
import Treino from "../screens/Treino"

export default function TreinoStack() {

    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Treinos">
            <Stack.Screen name="Treinos" component={Treinos}/>
            <Stack.Screen name="Treino" component={Treino}/>
            <Stack.Screen name="NovoExercicio" options={{title: "Novo Exercicio"}} component={NovoExercicio}/>
            <Stack.Screen name="EditarExercicio" component={ExercicioEdit}/>
        </Stack.Navigator>
    )
}