import { Tables } from "../database.types"

type Treino = Tables<"treino">
type Exercicio = Tables<"exercicio">
type ExercicioTreino = Tables<"exercicio_treino">

export { Treino, Exercicio, ExercicioTreino }