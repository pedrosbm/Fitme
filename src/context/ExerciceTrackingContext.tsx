import { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoredExerciseData } from "../types/StoredExerciseData";

const EXERCISE_KEY_PREFIX = "exercise_";
const EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000; // 24 horas

type ExerciceTrackingContextType = {
    completedExercises: Map<string, StoredExerciseData>;
    loading: boolean;
    error: string | null;
    markAsComplete: (exerciseId: string) => Promise<void>;
    markAsIncomplete: (exerciseId: string) => Promise<void>;
    isExerciseComplete: (exerciseId: string) => boolean;
    getCompletedCount: () => number;
    getTodayStats: (totalExercises: number) => { completed: number; total: number };
    clearExpiredData: () => Promise<void>;
};

const ExerciceTrackingContext = createContext<ExerciceTrackingContextType | null>(null);

const ExerciceTrackingProvider = ({ children }: PropsWithChildren) => {
    const [completedExercises, setCompletedExercises] = useState<Map<string, StoredExerciseData>>(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Verifica se o valor armazenado expirou
    const isExpired = (timestamp: number): boolean => {
        const now = Date.now();
        return now - timestamp > EXPIRATION_TIME_MS;
    };

    // Carrega todos os exercícios do AsyncStorage na inicialização
    useEffect(() => {
        const loadAllExercises = async () => {
            try {
                setLoading(true);
                const keys = await AsyncStorage.getAllKeys();
                const exerciseKeys = keys.filter(key => key.startsWith(EXERCISE_KEY_PREFIX));

                const exercisesMap = new Map<string, StoredExerciseData>();

                for (const key of exerciseKeys) {
                    const storedData = await AsyncStorage.getItem(key);
                    if (storedData) {
                        const data: StoredExerciseData = JSON.parse(storedData);

                        // Se expirou, remove do AsyncStorage
                        if (isExpired(data.timestamp)) {
                            await AsyncStorage.removeItem(key);
                        } else {
                            const exerciseId = key.replace(EXERCISE_KEY_PREFIX, "");
                            exercisesMap.set(exerciseId, data);
                        }
                    }
                }

                setCompletedExercises(exercisesMap);
                setError(null);
            } catch (err) {
                console.error("Erro ao carregar exercícios:", err);
                setError("Falha ao carregar histórico de exercícios");
            } finally {
                setLoading(false);
            }
        };

        loadAllExercises();
    }, []);

    // Marca um exercício como completo
    const markAsComplete = async (exerciseId: string): Promise<void> => {
        try {
            const data: StoredExerciseData = {
                checked: true,
                timestamp: Date.now(),
            };

            const key = `${EXERCISE_KEY_PREFIX}${exerciseId}`;
            await AsyncStorage.setItem(key, JSON.stringify(data));

            setCompletedExercises(prev => new Map(prev).set(exerciseId, data));
            setError(null);
        } catch (err) {
            console.error("Erro ao marcar exercício como completo:", err);
            setError("Falha ao salvar exercício");
        }
    };

    // Marca um exercício como incompleto
    const markAsIncomplete = async (exerciseId: string): Promise<void> => {
        try {
            const key = `${EXERCISE_KEY_PREFIX}${exerciseId}`;
            await AsyncStorage.removeItem(key);

            const newMap = new Map(completedExercises);
            newMap.delete(exerciseId);
            setCompletedExercises(newMap);
            setError(null);
        } catch (err) {
            console.error("Erro ao marcar exercício como incompleto:", err);
            setError("Falha ao remover exercício");
        }
    };

    // Verifica se um exercício foi completado
    const isExerciseComplete = (exerciseId: string): boolean => {
        const exercise = completedExercises.get(exerciseId);
        if (!exercise) return false;

        // Verifica se expirou mesmo dentro do Map
        if (isExpired(exercise.timestamp)) {
            markAsIncomplete(exerciseId);
            return false;
        }

        return exercise.checked;
    };

    // Retorna quantidade de exercícios completados
    const getCompletedCount = (): number => {
        return completedExercises.size;
    };

    // Retorna stats do dia
    const getTodayStats = (totalExercises: number): { completed: number; total: number } => {
        return {
            completed: getCompletedCount(),
            total: totalExercises,
        };
    };

    // Limpa dados expirados
    const clearExpiredData = async (): Promise<void> => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const exerciseKeys = keys.filter(key => key.startsWith(EXERCISE_KEY_PREFIX));

            for (const key of exerciseKeys) {
                const storedData = await AsyncStorage.getItem(key);
                if (storedData) {
                    const data: StoredExerciseData = JSON.parse(storedData);

                    if (isExpired(data.timestamp)) {
                        await AsyncStorage.removeItem(key);
                    }
                }
            }

            // Recarrega o Map após limpeza
            await loadAllExercises();
            setError(null);
        } catch (err) {
            console.error("Erro ao limpar dados expirados:", err);
            setError("Falha ao limpar dados expirados");
        }
    };

    // TODO: Adicionar método para sincronizar com backend/database quando online

    const loadAllExercises = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const exerciseKeys = keys.filter(key => key.startsWith(EXERCISE_KEY_PREFIX));

            const exercisesMap = new Map<string, StoredExerciseData>();

            for (const key of exerciseKeys) {
                const storedData = await AsyncStorage.getItem(key);
                if (storedData) {
                    const data: StoredExerciseData = JSON.parse(storedData);

                    if (!isExpired(data.timestamp)) {
                        const exerciseId = key.replace(EXERCISE_KEY_PREFIX, "");
                        exercisesMap.set(exerciseId, data);
                    }
                }
            }

            setCompletedExercises(exercisesMap);
        } catch (err) {
            console.error("Erro ao recarregar exercícios:", err);
        }
    };

    const value: ExerciceTrackingContextType = {
        completedExercises,
        loading,
        error,
        markAsComplete,
        markAsIncomplete,
        isExerciseComplete,
        getCompletedCount,
        getTodayStats,
        clearExpiredData,
    };

    return (
        <ExerciceTrackingContext.Provider value={value}>
            {children}
        </ExerciceTrackingContext.Provider>
    );
};

export { ExerciceTrackingContext, ExerciceTrackingProvider };
