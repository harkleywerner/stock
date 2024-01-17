import { createContext } from "react";
import { useAlerta } from "./useAlerta";
import { ContenedorDeAlertas } from "../../components/ContenedorDeAlertas";

export const AlertasContext = createContext()

export const AlertasProvider = ({ children }) => {
    const { alertas, establercerAlerta, removerAlertas } = useAlerta()

    return (
        <AlertasContext.Provider value={{ establercerAlerta, removerAlertas }}>
            <ContenedorDeAlertas alertas={alertas} />
            {children}
        </AlertasContext.Provider>
    );
};

