import { AuthProvider } from "./src/context/AuthContext";
import Index from "./src/Index";

export default function App() {
    return (
        <>
            {/* TODO inicializar estados globais */}
            <AuthProvider>
                <Index />
            </AuthProvider>
        </>
    )
}