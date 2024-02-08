import { createContext, useEffect } from "react";
import { useTablaItemReducer } from "./hooks/useTablaItemReducer";


export const gestionDeStockContext = createContext()

export const GestionDeStockProvider = ({ children }) => {

    const dataB = []

    const nuevaTabla = useTablaItemReducer()

    const ultimaTabla = useTablaItemReducer()


    useEffect(() => {

        ultimaTabla.inicilizarState(dataB)

    }, [JSON.stringify(dataB)])



    return (
        <gestionDeStockContext.Provider value={{ nuevaTabla, ultimaTabla }}>
            {
                children
            }
        </gestionDeStockContext.Provider>

    )
};
