import { createContext, lazy, useEffect } from "react";
import { useAlerta } from "./hooks/useAlerta";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { useLocation } from "react-router-dom";

const AlertaPromises = lazy(() => import("./AlertaPromise/AlertaPromises"))

const AlertaPromisesContext = createContext()

const WrapperAlerta = ({ alerta, removerAlerta }) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { pathname } = useLocation()

    useEffect(() => {
        mostrar && alternarMostrar(false)
    }, [pathname])

    return (
        <AlertaPromises
            {...alerta}
            alternarMostrar={alternarMostrar}
            mostrar={mostrar}
            removerAlerta={removerAlerta}
        />
    )
}

export const AlertaPromisesProvider = ({ children }) => {

    const { alertas, establecerAlerta, removerAlerta } = useAlerta()

    const alerta = alertas[0]

    return (
        <AlertaPromisesContext.Provider
            value={{ establecerAlerta, removerAlerta, alertas }}>

            {
                alerta && <WrapperAlerta
                    alerta={alerta}
                    removerAlerta={removerAlerta} />
            }
            {children}
        </AlertaPromisesContext.Provider>
    )
};

export default AlertaPromisesContext