import { User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Credentials } from "../types/credentials";

type Context = {
    isLoggedIn: boolean,
    signIn: (credentials: Credentials) => void,
    signUp: (credentials: Credentials) => void
    signOut: () => void,
    loadingAuth: boolean,
    // Desmocar tipagem de usuario
    user: User | null
}

const AuthContext = createContext<Context | null>(null)

// TODO fazer tratamento de erros do contexto de autenticação
// TODO corrigir fliquering de autenticação com o loadingAuth
const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null)
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true)

    // Listener de autenticação e carregamento da sessão inicial
    useEffect(() => {
        const loadSession = async () => {
            const { data } = await supabase.auth.getSession()

            setUser(data.session?.user ?? null)
            setLoadingAuth(false)
        }
        loadSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setUser(null)
                } else if (session) {
                    setUser(session.user)
                }
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const signIn = async (credentials: Credentials) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.senha
        })
    }

    const signUp = async (credentials: Credentials) => {
        const { error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.senha
        })
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
    }

    const isLoggedIn = user !== null

    const value: Context = {
        isLoggedIn,
        signIn,
        signUp,
        signOut,
        loadingAuth,
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }