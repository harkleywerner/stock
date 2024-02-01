import { useContext } from "react";
import { NotificacionesContext } from "./NotificacionesProvider";

const wrapperNotificaciones = (Component) => {

    return (props) => {
        const { establecerAlerta, establecerToast } = useContext(NotificacionesContext) || {};

    
        return (
            <Component establecerAlerta={establecerAlerta} establecerToast={establecerToast} {...props} />
        )
    };
}

export default wrapperNotificaciones