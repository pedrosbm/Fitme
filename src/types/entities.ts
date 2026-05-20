import { Tables } from "../database.types"

type Treino = Tables<"treino">
type Exercicio = Tables<"exercicio">
type ExercicioTreino = Tables<"exercicio_treino">

type ExercicioTreinoWithExercicio = ExercicioTreino & {
    id_exercicio: Exercicio | null
}

export { Treino, Exercicio, ExercicioTreino, ExercicioTreinoWithExercicio }