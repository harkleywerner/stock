
import { useContext, useEffect, useMemo } from "react";
import shortUUID from "short-uuid";
import { usePromiseHandler } from "./hooks/usePromiseHandler.hook";
import axios from "axios";
import AlertaPromisesContext from "@/provider//AlertaPromisesProvider/AlertaPromises.provider";


export const wrapperNotificacionesServidor = (Component) => {

    return (props) => {

        const shortId = useMemo(() => {
            return shortUUID.generate()
        }, [])

        const cancelToken = axios.CancelToken.source()

        const { establecerAlerta, removerAlerta } = useContext(AlertaPromisesContext) || {}

        const promiseHandler = usePromiseHandler({ establecerAlerta, shortId, cancelToken })

        useEffect(() => {

            return () => { //=> Este enfoque sirve para cuando querramos que se elimine la alerta cuando se desmonta el componente.
                removerAlerta(shortId)
                cancelToken.cancel()
            }
        }, [])



        return <Component {...props} {...promiseHandler} />
    }
};