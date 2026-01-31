import { NavigationContainer } from "@react-navigation/native";

import useAuth from "./hooks/useAuth";

import AuthStack from "./navigation/AuthStack";
import AppTabs from "./navigation/AppTabs";

/**
 * Main stack
 */
export default function Index() {
    const { isLoggedIn } = useAuth()

    return (
        <>
            <NavigationContainer>
                {
                    isLoggedIn ?
                        <AppTabs /> : <AuthStack />
                }
            </NavigationContainer>
        </>
    )
}