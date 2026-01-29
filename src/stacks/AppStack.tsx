import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AppStackNavigation } from "../types/Stacks"
import Home from "../screens/Home"

export default function AppStack(){

    const Stack = createNativeStackNavigator<AppStackNavigation>()

    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    )
}