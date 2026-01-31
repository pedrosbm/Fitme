import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthStack as Stack } from "../types/Navigation"

// Screens
import { Login, Register, Welcome } from "../screens/auth/screens"

export default function AuthStack() {
    const Stack = createNativeStackNavigator<Stack>()

    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}