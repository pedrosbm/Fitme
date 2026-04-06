import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { TreinoStack as Stack } from "../types/Navigation"
import ExercicioEdit from "../screens/ExercicioEdit"
import NovoExercicio from "../screens/NovoExercicio"

import Workout from "../screens/Workout"
import UserWorkouts from "../screens/UserWorkouts"

export default function TreinoStack() {

    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Treinos">
            <Stack.Screen name="Treinos" component={UserWorkouts}/>
            <Stack.Screen name="Treino" component={Workout}/>
            <Stack.Screen name="NovoExercicio" options={{title: "Novo Exercicio"}} component={NovoExercicio}/>
            <Stack.Screen name="EditarExercicio" component={ExercicioEdit}/>
        </Stack.Navigator>
    )
}