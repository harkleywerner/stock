
import AlertaPromisesContext from "@/provider//AlertaRetryProvider/AlertaPromises.provider";
import { useContext, useEffect, useMemo } from "react";
import shortUUID from "short-uuid";
import { usePromiseHandler } from "./hooks/usePromiseHandler.hook";


export const wrapperNotificacionesServidor = (Component) => {

    return (props) => {

        const shortId = useMemo(() => {
            return shortUUID.generate()
        }, [])


        const { establecerAlerta, removerAlerta } = useContext(AlertaPromisesContext) || {}

        const promiseHandler = usePromiseHandler({ establecerAlerta, shortId })

        useEffect(() => {

            return () => { //=> Este enfoque sirve para cuando querramos que se elimine la alerta cuando se desmonta el componente.
                removerAlerta(shortId)
            }
        }, [])



        return <Component {...props} {...promiseHandler} removerAlerta={removerAlerta} />
    }
};