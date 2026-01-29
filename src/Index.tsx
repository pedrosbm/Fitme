import { NavigationContainer } from "@react-navigation/native";

import useAuth from "./hooks/useAuth";

import AppStack from "./stacks/AppStack";
import AuthStack from "./stacks/AuthStack";

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
                        <AppStack /> : <AuthStack />
                }
            </NavigationContainer>
        </>
    )
}