import { createContext } from "react";
import { useTablaItemReducer } from "./hooks/useTablaItemReducer";


export const gestionDeStockContext = createContext()

export const GestionDeStockProvider = ({ children }) => {


    const nuevaTabla = useTablaItemReducer()

    const ultimaTabla = useTablaItemReducer()


    return (
        <gestionDeStockContext.Provider value={{ nuevaTabla, ultimaTabla }}>
            {
                children
            }
        </gestionDeStockContext.Provider>

    )
};
