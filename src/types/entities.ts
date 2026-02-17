type treino = {
    "id": string,
    "label": string,
    "nome": string,
    "user"?: string
}

type exercicio = {
    id: string
    nome: string,
    imagem: string,
    musculo_principal: string[],
    musculo_secundario: string[],
    descricao: string,
    tutorial: string[],
    exemplos: string[]
}

type exercicio_treino = {
    id: string,
    id_treino?: string,
    id_exercicio?: string,
    repeticoes: number,
    series: number,
    descanso: number,
    carga: number[]
}

export { treino, exercicio, exercicio_treino }