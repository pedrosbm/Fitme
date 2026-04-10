import { supabase } from "../supabase";

const getTreinosMinimal = (userId: string) => {
    return supabase
        .from("treino")
        .select("*")
        .eq("user", userId)
}

export { getTreinosMinimal }