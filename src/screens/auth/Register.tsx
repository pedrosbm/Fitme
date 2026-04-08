import { TextInput, View, Button } from "react-native"
import { Text } from "react-native-paper"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import { Credentials } from "../../types/credentials"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStack } from "../../types/Navigation"

type Props = NativeStackScreenProps<AuthStack, "Register">

export function Register({navigation}: Props) {
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        senha: ""
    })

    const { signUp } = useAuth()

    const onChange = (field: keyof Credentials) => {
        return (value: string) => {
            setCredentials((prev) => ({ ...prev, [field]: value }))
        }
    }

    const submit = () => {
        signUp(credentials)
    }

    return (
        <>
            <View>
                <Text>Cadastro</Text>

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

                <Button title="Cadastrar-se" onPress={submit} />
                <Button title="Já tenho conta" onPress={() => navigation.navigate("Login")} />
            </View>
        </>
    )
}