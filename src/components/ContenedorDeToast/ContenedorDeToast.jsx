import { useDispatch, useSelector } from "react-redux";
import { ToastComponent } from "@/components/ContenedorDeToast/ToastComponent";
import { useEffect } from "react";
import { removerToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";


export const ContenedorDeToast = () => {

    const { listaToast } = useSelector(s => s.toast_notificaciones)

    const dispatch = useDispatch()

    useEffect(() => {

        if (listaToast.length == 0) return

        const timeOut = setTimeout(() => {
            const id = listaToast[0]?.id
            dispatch(removerToast({ id }))
        }, 3000);

        return () => clearTimeout(timeOut)
    }, [JSON.stringify(listaToast)])


    return (
        listaToast.length > 0 && <div
            id="contenedor-toast"
            className="position-fixed "
            style={{ zIndex: "5000", maxHeight: "h-100", right: "0.5%", top: "0%" }} >
            {
                listaToast.length > 0 && listaToast.map(item => <ToastComponent key={item.id} {...item} />)
            }
        </div>
    );
};