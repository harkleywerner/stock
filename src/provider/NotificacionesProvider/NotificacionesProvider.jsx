import { createContext } from "react";
import { useToast } from "./useToast";
import { ContenedorDeToast } from "./ContenedorDeToast";
import { AlertaComponent } from "./AlertaComponent";
import { useAlerta } from "./useAlerta";

export const NotificacionesContext = createContext()

export const NotificacionesProvider = ({ children }) => {

    const { toasts, establecerToast, removerToast } = useToast()
    const { alerta, establecerAlerta, removerAlerta, establecerIntentos } = useAlerta()


    return (
        <NotificacionesContext.Provider value={{ establecerAlerta, establecerToast,removerAlerta }}>
            {
                toasts.length > 0 &&
                <ContenedorDeToast
                    toasts={toasts}
                    removerToast={removerToast} />
            }
            {
                alerta &&
                <AlertaComponent
                    {...alerta} 
                    establecerIntentos={establecerIntentos}
                    removerAlerta={removerAlerta} />
            }

            {children}
        </NotificacionesContext.Provider>
    );
};

