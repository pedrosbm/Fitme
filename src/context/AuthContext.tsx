import { createContext, PropsWithChildren, useState } from "react";

type User = {
    name: string,
    email: string
}

type Context = {
    isLoggedIn: boolean,
    signIn: () => void,
    signOut: () => void,
    // Desmocar tipagem de usuario
    user: User | undefined
}

const AuthContext = createContext<Context>({} as Context)

// TODO implementar autenticação com supabase
const AuthProvider = ({ children }: PropsWithChildren) => {
    // TODO Desmocar usuario
    const [user, setUser] = useState<User | undefined>({
        email: "pedrosbmartinazzo@hotmail.com",
        name: "Pedro"
    })
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

    const signIn = () => {
        setIsLoggedIn(true)
    }

    const signOut = () => {
        setIsLoggedIn(false)
    }

    const value: Context = {
        isLoggedIn,
        signIn,
        signOut,
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }