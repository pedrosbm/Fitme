import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Treinos from "../screens/Treinos"
import { TreinoStack as Stack } from "../types/Navigation"

export default function TreinoStack() {

    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Treinos">
            <Stack.Screen name="Treinos" component={Treinos}/>
        </Stack.Navigator>
    )
}