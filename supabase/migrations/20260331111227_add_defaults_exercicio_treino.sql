-- Migration: add defaults and constraints to exercicio_treino
-- Date: 2026-03-31

BEGIN;

-- Set default values
ALTER TABLE "exercicio_treino" ALTER COLUMN "series" SET DEFAULT 3;
ALTER TABLE "exercicio_treino" ALTER COLUMN "descanso" SET DEFAULT 60;
ALTER TABLE "exercicio_treino" ALTER COLUMN "repeticoes" SET DEFAULT 12;

-- Add check constraints to enforce sensible values
ALTER TABLE "exercicio_treino" ADD CONSTRAINT "exercicio_treino_series_positive" CHECK ("series" > 0);
ALTER TABLE "exercicio_treino" ADD CONSTRAINT "exercicio_treino_descanso_nonnegative" CHECK ("descanso" >= 0);
ALTER TABLE "exercicio_treino" ADD CONSTRAINT "exercicio_treino_repeticoes_positive" CHECK ("repeticoes" > 0);

COMMIT;
