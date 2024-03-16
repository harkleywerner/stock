
import AlertaPromisesContext from "@/provider//AlertaPromisesProvider/AlertaPromises.provider";
import axios from "axios";
import { useContext, useEffect } from "react";
import shortUUID from "short-uuid";
import { usePromiseHandler } from "./hooks/usePromiseHandler.hook";


export const wrapperNotificacionesServidor = (Component) => {

    return (props) => {

        const shortId =  shortUUID.generate()
           
        const cancelToken = axios.CancelToken.source()

        const { establecerAlerta, removerAlerta } = useContext(AlertaPromisesContext) || {}

        const promiseHandler = usePromiseHandler({ establecerAlerta, shortId, cancelToken })

        useEffect(() => {

            return () => { //=> Se borran tanto como las alertas y los tokens de llamadas.
                removerAlerta(shortId)
                cancelToken.cancel()
            }
        }, [])



        return <Component {...props} {...promiseHandler} />
    }
};