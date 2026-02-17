import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { treino } from "../types/entities";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Context = {
    day: number | undefined,
    status: "Não iniciado" | "Em progresso" | undefined,
    treinos: treino[]
}

const WorkoutContext = createContext<Context>({} as Context)

const WorkoutProvider = ({ children }: PropsWithChildren) => {
    // TODO tipar treino com supabase types
    // TODO desmocar
    const [treinos, setTreinos] = useState<treino[]>([{
        id: "aopsd",
        label: "A",
        nome: "Peito",
    }])
    const [day, setDay] = useState<number | undefined>()
    const [status, setStatus] = useState<"Não iniciado" | "Em progresso">("Não iniciado")

    // TODO implementar busca de treino com client
    useEffect(() => {
        const treinos = [
            {
                "id": "1",
                "label": "A",
                "nome": "Superior"
            },
            {
                "id": "2",
                "label": "B",
                "nome": "Inferior"
            }
        ]

        setTreinos(treinos)
    }, [setTreinos])

    // Busca o dia do usuário
    useEffect(() => {
        AsyncStorage.getItem("day").then(day => {
            if (day == null) {
                setDay(0)
                return
            }

            if (Number(day) > treinos.length) {
                setDay(0)
                return
            }

            setDay(Number(day))
        })
    }, [treinos])

    const value: Context = {
        day,
        status,
        treinos
    }

    return (
        <WorkoutContext.Provider value={value}>
            {children}
        </WorkoutContext.Provider>
    )
}

export { WorkoutContext, WorkoutProvider }