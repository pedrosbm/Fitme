import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Index from "./src/Index";
import { WorkoutProvider } from "./src/context/WorkoutContext";

export default function App() {
    return (
        <>
            <AuthProvider>
                <PaperProvider>
                    <WorkoutProvider>
                        <SafeAreaProvider>
                            <StatusBar style="auto" />
                            <Index />
                        </SafeAreaProvider>
                    </WorkoutProvider>
                </PaperProvider>
            </AuthProvider>
        </>
    )
}