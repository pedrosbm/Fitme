import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Treino } from "../types/entities";
import { supabase } from "../supabase";
import { getTreinosMinimal } from "../queryes/treino";

type Context = {
    day: number,
    status: "Não iniciado" | "Em progresso" | undefined,
    treinos: Treino[],
    todayWorkout: Treino,
    setTreinos: Dispatch<SetStateAction<Treino[]>>
}

const WorkoutContext = createContext<Context | null>(null)

const WorkoutProvider = ({ children }: PropsWithChildren) => {
    const [treinos, setTreinos] = useState<Treino[]>([])
    const [day, setDay] = useState<number>(0)
    // TODO Implementar atualização de status
    const [status, setStatus] = useState<"Não iniciado" | "Em progresso">("Não iniciado")

    useEffect(() => {
        const fetchTreinos = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()

            if (error) throw error

            if (user) {
                const { data } = await getTreinosMinimal(user?.id)
                if (data) {
                    console.log(data)
                    setTreinos(data)
                }
            }
        }

        fetchTreinos()
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
        todayWorkout,
        setTreinos
    }

    return (
        <WorkoutContext.Provider value={value}>
            {children}
        </WorkoutContext.Provider>
    )
}

export { WorkoutContext, WorkoutProvider }