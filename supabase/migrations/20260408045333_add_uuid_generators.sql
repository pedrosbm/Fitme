-- Define default gen_random_uuid() para os ids das tabelas do sistema
ALTER TABLE "treino" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "exercicio" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "exercicio_treino" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- Observação: esta migration apenas adiciona defaults; registros existentes não são alterados.
