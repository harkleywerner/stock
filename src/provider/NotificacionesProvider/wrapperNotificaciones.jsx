import { useContext } from "react";
import { NotificacionesContext } from "./NotificacionesProvider";

const wrapperNotificaciones = (Component) => {

    return (props) => {
        const { establecerAlerta, establecerToast,removerAlerta } = useContext(NotificacionesContext) || {};

    
        return (
            <Component establecerAlerta={establecerAlerta} removerAlerta = {removerAlerta} establecerToast={establecerToast} {...props} />
        )
    };
}

export default wrapperNotificaciones