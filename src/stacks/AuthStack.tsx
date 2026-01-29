import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthStackNavigation } from "../types/Stacks"

import { Login } from "../screens/auth/Login"
import Welcome from "../screens/auth/Welcome"
import Register from "../screens/auth/Register"

export default function AuthStack() {
    const Stack = createNativeStackNavigator<AuthStackNavigation>()

    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
    )
}