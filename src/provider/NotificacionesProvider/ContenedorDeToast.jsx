import { memo } from "react";
import { Toast } from "react-bootstrap";
import styles from "@/styles/Notificaciones.module.css"

const icon = {
    warning: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info",
    danger: "fa-solid fa-circle-exclamation",
    success: "fa-solid fa-circle-check"
}

export const ToastComponent = memo(({ texto, tipo, removerToast, id }) => {

    return (
        <Toast
            className={`my-2 shadow  ${styles.ToastAnimacion}`}
            onClose={() => removerToast(id)} >
            <Toast.Header  >
                <i className={`${icon[tipo]} text-${tipo} fs-2 `}></i>
                <strong className="me-auto text-uppercase mx-2 ">{tipo}</strong>
            </Toast.Header>
            <Toast.Body style={{fontSize : "15px"}}>{texto}</Toast.Body>
        </Toast>
    );
})

export const ContenedorDeToast = memo(({ toasts, removerToast }) => {

    return (
        <div
            id="contenedor-toast"
            className="position-fixed "
            style={{ zIndex: "5000", maxHeight: "h-100", right: "0.5%", top: "0%" }} >
            {
                toasts.length > 0 && toasts.map((item, index) => <ToastComponent removerToast={removerToast} key={index} {...item} />)
            }
        </div>
    );
})