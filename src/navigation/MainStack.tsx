import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MainStack as Stack } from "../types/Navigation"
import Home from "../screens/Home"
import Workout from "../screens/Workout"
import Exercicio from "../screens/Exercicio"

export default function MainStack() {
    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Workout" component={Workout}/>
            <Stack.Screen name="Exercicio" component={Exercicio} />
        </Stack.Navigator>
    )
}