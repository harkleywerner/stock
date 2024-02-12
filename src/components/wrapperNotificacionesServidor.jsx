import { usePromiseHandler } from "@/hooks//usePromiseHandler";
import AlertaRetryContext from "@/provider/AlertaRetryProvider/AlertaRerty.provider";
import { useContext } from "react";


export const wrapperNotificacionesServidor = (Component) => {

    return (props) => {

        const { establecerAlerta } = useContext(AlertaRetryContext) || {}

        const promiseHandler = usePromiseHandler({ establecerAlerta })

        return <Component {...props} {...promiseHandler} />
    }
};