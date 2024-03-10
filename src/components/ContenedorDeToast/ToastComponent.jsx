import { removerToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import styles from "@/styles/ToastNotificaciones.module.css";
import { memo } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";

const icon = {
    warning: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info",
    danger: "fa-solid fa-circle-exclamation",
    success: "fa-solid fa-circle-check"
}



export const ToastComponent = memo((
    {
        texto,
        tipo,
        id,
        children
    }) => {
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
            <Toast.Body style={{ fontSize: "15px" }}>
                <p className="m-0">{texto}</p>
                {children}
            </Toast.Body>
        </Toast>
    );
})

