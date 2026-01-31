type AuthStack = {
    Welcome: undefined,
    Login: undefined,
    Register: undefined
}

type HomeStack = {
    Home: undefined,
    Workout: undefined,
    Exercicio: { id: number }
}

type TreinoStack = {
    Treinos: undefined,
    Treino: { id: number },
    Exercicio: { id: number },
    NovoExercicio: undefined
}

type PerfilStack = {
    Perfil: undefined
}

export {
    AuthStack,
    HomeStack,
    TreinoStack,
    PerfilStack
}