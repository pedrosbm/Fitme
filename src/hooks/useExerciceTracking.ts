import { useContext } from "react";
import { ExerciceTrackingContext } from "../context/ExerciceTrackingContext";

export function useExerciceTracking() {
    const context = useContext(ExerciceTrackingContext);

    if (!context) {
        throw new Error("useExerciceTracking deve ser usado dentro de um ExerciceTrackingProvider");
    }

    return context;
}
