import { createContext } from "react";

export const nuevoStockContext = createContext()

export const NuevoStockProvider = ({ children }) => {

    return (
        <nuevoStockContext.Provider value={{ ob: "ff" }}>
            {
                children
            }
        </nuevoStockContext.Provider>

    )
};
