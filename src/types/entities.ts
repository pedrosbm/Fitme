import { Tables } from "../database.types"

type treino = Tables<"treino">
type exercicio = Tables<"exercicio">
type exercicio_treino = Tables<"exercicio_treino">

export { treino, exercicio, exercicio_treino }