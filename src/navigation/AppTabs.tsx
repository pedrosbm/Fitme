import MainStack from "./MainStack"
import TreinoStack from "./TreinoStack"
import PerfilStack from "./PerfilStack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { WorkoutProvider } from "../context/WorkoutContext"

export default function AppTabs() {
    const Tab = createBottomTabNavigator()

    return (
        <WorkoutProvider>
            <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="tab1">
                <Tab.Screen name="tab1" options={{ title: "Home" }} component={MainStack} />
                <Tab.Screen name="tab2" options={{ title: "Treino" }} component={TreinoStack} />
                <Tab.Screen name="tab3" options={{ title: "Perfil" }} component={PerfilStack} />
            </Tab.Navigator>
        </WorkoutProvider>
    )
}