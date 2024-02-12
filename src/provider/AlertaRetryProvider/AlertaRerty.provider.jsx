import { createContext, lazy } from "react";
import { useAlerta } from "./hooks/useAlerta";

const AlertaRetry = lazy(() => import("./AlertaRetry"))

const AlertaRetryContext = createContext()

export const AlertaRertyProvider = ({ children }) => {

    const { alertas, establecerAlerta, establecerIntentos, removerAlerta } = useAlerta()

    return (
        <AlertaRetryContext.Provider value={{ establecerAlerta }}>
            {
                alertas && <AlertaRetry
                    {...alertas}
                    establecerIntentos={establecerIntentos}
                    removerAlerta={removerAlerta} />
            }
            {children}
        </AlertaRetryContext.Provider>
    )
};

export default AlertaRetryContext