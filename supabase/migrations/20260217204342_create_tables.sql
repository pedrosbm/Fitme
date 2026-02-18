CREATE TABLE "treino"(
    "id" UUID NOT NULL,
    "label" CHAR(1) NOT NULL,
    "nome" TEXT NOT NULL,
    "user" UUID NOT NULL
);
ALTER TABLE
    "treino" ADD PRIMARY KEY("id");
    
CREATE TABLE "exercicio"(
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NULL,
    "musculo_principal" TEXT[] NOT NULL,
    "musculo_secundario" TEXT[] NOT NULL,
    "descricao" TEXT NOT NULL,
    "tutorial" TEXT[] NOT NULL,
    "exemplos" TEXT[] NULL
);
ALTER TABLE
    "exercicio" ADD PRIMARY KEY("id");

CREATE TABLE "exercicio_treino"(
    "id" UUID NOT NULL,
    "id_treino" UUID NOT NULL,
    "id_exercicio" UUID NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "descanso" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "carga" INTEGER[] NULL
);
ALTER TABLE
    "exercicio_treino" ADD PRIMARY KEY("id");

-- Foreign keys
ALTER TABLE
    "exercicio_treino" ADD CONSTRAINT "exercicio_treino_id_exercicio_foreign" FOREIGN KEY("id_exercicio") REFERENCES "exercicio"("id");
ALTER TABLE
    "exercicio_treino" ADD CONSTRAINT "exercicio_treino_id_treino_foreign" FOREIGN KEY("id_treino") REFERENCES "treino"("id");
ALTER TABLE
    "treino" ADD CONSTRAINT "treino_user_foreign" FOREIGN KEY("user") REFERENCES auth.users("id");
