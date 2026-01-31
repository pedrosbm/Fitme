import { View } from "react-native";
import useAuth from "../../hooks/useAuth";
import { Button, Text } from "react-native-paper";

export function Login() {

    const { signIn } = useAuth()

    return (
        <>
            <View>
                <Text>Login</Text>
                <Button onPress={signIn}>Logar</Button>
            </View>
        </>
    )
}