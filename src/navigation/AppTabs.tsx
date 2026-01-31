import HomeStack from "./HomeStack"
import TreinoStack from "./TreinoStack"
import PerfilStack from "./PerfilStack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

export default function AppTabs(){
    const Tab = createBottomTabNavigator() 

    return(
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeStack}/>
            <Tab.Screen name="Treinos" component={TreinoStack} />
            <Tab.Screen name="Perfil" component={PerfilStack} />
        </Tab.Navigator>
    )
}