import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Perfil from "../screens/perfil/Perfil"
import { PerfilStack as Stack } from "../types/Navigation"
import PerfilDetails from "../screens/perfil/PerfilDetails"

export default function PerfilStack() {

    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Perfil">
            <Stack.Screen name="Perfil" component={Perfil}/>
            <Stack.Screen name="Detalhes" component={PerfilDetails}/>
        </Stack.Navigator>
    )
}