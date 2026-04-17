import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MainStack as Stack } from "../types/Navigation"
import Home from "../screens/home/Home"
import Exercicio from "../screens/home/Exercicio"
import TrackWorkout from "../screens/home/TrackWorkout"

export default function MainStack() {
    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Workout" component={TrackWorkout}/>
            <Stack.Screen name="Exercicio" component={Exercicio} />
        </Stack.Navigator>
    )
}