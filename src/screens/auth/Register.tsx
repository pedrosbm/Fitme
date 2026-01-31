import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import useAuth from "../../hooks/useAuth"

export function Register() {
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