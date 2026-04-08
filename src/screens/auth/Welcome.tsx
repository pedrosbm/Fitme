import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStack } from "../../types/Navigation"
import { Button, Text, View } from "react-native"

type Props = NativeStackScreenProps<AuthStack, "Welcome">
export function Welcome({ navigation }: Props) {

    return (
        <View>
            <Text>FITME</Text>
            <Button title="Entrar" onPress={() => navigation.navigate("Login")}/>
        </View>
    )
}