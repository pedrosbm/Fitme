import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Treino } from "../types/entities";
import { supabase } from "../supabase";

type Context = {
    day: number,
    setDay: Dispatch<SetStateAction<number>>
    inProgress: boolean,
    setInProgress: Dispatch<SetStateAction<boolean>>
    treinos: Treino[],
    todayWorkout: Treino | undefined,
    setTreinos: Dispatch<SetStateAction<Treino[]>>
}

const WorkoutContext = createContext<Context | null>(null)

const WorkoutProvider = ({ children }: PropsWithChildren) => {
    const [treinos, setTreinos] = useState<Treino[]>([])
    const [day, setDay] = useState<number>(0)
    const [inProgress, setInProgress] = useState<boolean>(false)

    useEffect(() => {
        const fetchTreinos = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()

            if (error) throw error

            if (user) {
                const { data } = await supabase
                    .from("treino")
                    .select("*")
                    .eq("user", user.id)

                if (data) {
                    setTreinos(data)
                }
            }
        }
        // TODO: Adicionar try/catch para melhor error handling (setError state)
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

    useEffect(() => {
        AsyncStorage.setItem("day", day.toString())
    }, [day])

    const todayWorkout = treinos[day]

    // TODO: Migrar para TanStack Query + Supabase cache helpers para otimizar fetches

    const value: Context = {
        day,
        setDay,
        inProgress,
        setInProgress,
        treinos,
        setTreinos,
        todayWorkout
    }

    return (
        <WorkoutContext.Provider value={value}>
            {children}
        </WorkoutContext.Provider>
    )
}

export { WorkoutContext, WorkoutProvider }