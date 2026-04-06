import { NavigationProp } from "@react-navigation/native"

type AuthStack = {
    Welcome: undefined,
    Login: undefined,
    Register: undefined
}

type AuthStackNavigationProp = NavigationProp<AuthStack>

type MainStack = {
    Home: undefined,
    Workout: { id: string },
    Exercicio: { id: string }
}

type MainStackNavigationProp = NavigationProp<MainStack>

type TreinoStack = {
    Treinos: undefined,
    Treino: { id: string },
    EditarExercicio: { id: string },
    NovoExercicio: { id: string }
}

type TreinoStackNavigationProp = NavigationProp<TreinoStack>

type PerfilStack = {
    Perfil: undefined,
    Detalhes: undefined
}

type PerfilStackNavigationProp = NavigationProp<PerfilStack>

export {
    AuthStack,
    AuthStackNavigationProp,
    MainStack,
    MainStackNavigationProp,
    TreinoStack,
    TreinoStackNavigationProp,
    PerfilStack,
    PerfilStackNavigationProp
}