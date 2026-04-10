import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";

export default function Perfil() {
    const { user, signOut } = useAuth()

    return (
        <SafeAreaView>
            <Text>{user?.email}</Text>

            <Button title="Sair" onPress={signOut} />
        </SafeAreaView>
    )
}