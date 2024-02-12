import { memo } from "react";
import { Toast } from "react-bootstrap";
import styles from "@/styles/Notificaciones.module.css"
import { useDispatch } from "react-redux";
import { removerToast } from "@/redux//slice/toastNotificaciones/toastNotificaciones.slice";

const icon = {
    warning: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info",
    danger: "fa-solid fa-circle-exclamation",
    success: "fa-solid fa-circle-check"
}

export const ToastComponent = memo(({ texto, tipo, id }) => {

    const dispatch = useDispatch()

    const dispatchRemoveToast = () => {
        dispatch(removerToast({ id }))
    }

    return (
        <Toast
            className={`my-2 shadow  ${styles.ToastAnimacion}`}
            onClose={dispatchRemoveToast} >
            <Toast.Header  >
                <i className={`${icon[tipo]} text-${tipo} fs-2 `}></i>
                <strong className="me-auto text-uppercase mx-2 ">{tipo}</strong>
            </Toast.Header>
            <Toast.Body style={{ fontSize: "15px" }}>{texto}</Toast.Body>
        </Toast>
    );
})

