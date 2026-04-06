import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { treino } from "../types/entities";

type Context = {
    day: number,
    status: "Não iniciado" | "Em progresso" | undefined,
    treinos: treino[],
    todayWorkout: treino
}

const WorkoutContext = createContext<Context | null>(null)

const WorkoutProvider = ({ children }: PropsWithChildren) => {
    const [treinos, setTreinos] = useState<treino[]>([])
    const [day, setDay] = useState<number>(0)
    // TODO Implementar atualização de status
    const [status, setStatus] = useState<"Não iniciado" | "Em progresso">("Não iniciado")

    // TODO implementar busca de treino com client
    useEffect(() => {
        const treinos = [{
            id: "id",
            label: "A",
            nome: "pernocas",
            user: "id"
        }]

        setTreinos(treinos)
    }, [])

    // Busca o dia do usuário baseado no armazenamento local e na rotina de treinos
    useEffect(() => {
        AsyncStorage.getItem("day").then(day => {
            // Se o dia armazenado não se encaixar na rotina, atualiza para zero
            if (Number(day) > treinos.length) {
                AsyncStorage.setItem("day", "0")
                return
            }
            // Armazena o dia de treino em uma variavel de estado
            // Se fôr Null, number retornará 0
            setDay(Number(day))
        })
    }, [treinos])

    const todayWorkout = treinos[day]

    const value: Context = {
        day,
        status,
        treinos,
        todayWorkout
    }

    return (
        <WorkoutContext.Provider value={value}>
            {children}
        </WorkoutContext.Provider>
    )
}

export { WorkoutContext, WorkoutProvider }