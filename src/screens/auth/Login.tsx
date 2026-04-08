import { Button, TextInput, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import { Text } from "react-native-paper";
import { useState } from "react";
import { Credentials } from "../../types/credentials";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStack } from "../../types/Navigation";

type Props = NativeStackScreenProps<AuthStack, "Login">

export function Login({ navigation }: Props) {
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        senha: ""
    })

    const { signIn } = useAuth()

    const onChange = (field: keyof Credentials) => {
        return (value: string) => {
            setCredentials((prev) => ({ ...prev, [field]: value }))
        }
    }

    const submit = () => {
        signIn(credentials)
    }

    return (
        <>
            <View>
                <Text>Login</Text>

                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={credentials.email}
                    onChangeText={onChange("email")}
                />

                <TextInput
                    placeholder="Senha"
                    value={credentials.senha}
                    keyboardType="default"
                    secureTextEntry
                    onChangeText={onChange("senha")}
                />

                <Button title="Logar" onPress={submit} />
                <Button title="Não tenho conta" onPress={() => navigation.navigate("Register")} />
            </View>
        </>
    )
}