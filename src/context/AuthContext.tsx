import { createContext, PropsWithChildren, useState } from "react";

type Context = {
    isLoggedIn: boolean,
}

const AuthContext = createContext<Context>({} as Context)

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

    const value: Context = {
        isLoggedIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }