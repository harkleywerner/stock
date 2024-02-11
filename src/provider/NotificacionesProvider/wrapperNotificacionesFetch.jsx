import { usePromiseHandler } from "@/hooks//usePromiseHandler";
import { NotificacionesContext } from "@/provider//NotificacionesProvider/NotificacionesProvider";
import { useContext } from "react";

export const wrapperNotificacionesFetch = (Component) => {

    return (props) => {

        const notificaciones = useContext(NotificacionesContext)

        const promiseHandler = usePromiseHandler({ establecerAlerta : notificaciones.establecerAlerta })

        return <Component {...props} {...promiseHandler} {...notificaciones} />
    }
};