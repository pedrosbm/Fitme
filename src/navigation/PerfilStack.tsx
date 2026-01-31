import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Perfil from "../screens/Perfil"
import { PerfilStack as Stack } from "../types/Navigation"

export default function PerfilStack() {

    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Perfil">
            <Stack.Screen name="Perfil" component={Perfil}/>
        </Stack.Navigator>
    )
}