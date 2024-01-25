import { memo, useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import styles from "@/styles/ContenedorDeAlertas.module.css"

const icon = {
    warning: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info",
    danger: "fa-solid fa-circle-exclamation",
    success: "fa-solid fa-circle-check"
}

export const Alerta = memo(({ texto, tipo }) => {

    return (
        <Alert
            id={styles.AlertaInformativa}
            variant={tipo}
            style={{ maxWidth: "400px", minWidth: "400px",opacity : "0.9" }}
            className={`border-${tipo}  d-flex bg-white align-items-center justfiy-content-center shadow  p-2`}
        >
            <i className={`${icon[tipo]} fs-3 mx-2 `}></i>
            <Alert.Heading
                className="fs-5 text-break"
            >
                {texto}<span className="font">...</span>
            </Alert.Heading>
        </Alert>
    );
})

export const ContenedorDeAlertas = ({ alertas }) => {

    const ref = useRef()

    const [rects, setRects] = useState()

    useEffect(() => {

        const resize = () => {
    
            const rect = ref.current.getBoundingClientRect()
            setRects(rect)
        }

        const posicionamientoAlertas = (e) => {

            const rect = rects || ref.current.getBoundingClientRect()
            const totalY = rect.y + ref.current.clientHeight
            const totalX = rect.x + ref.current.clientWidth

            if (e.x >= rect.x && e.x <= totalX && e.y >= rect.y && e.y <= totalY) {
            
                ref.current.style.zIndex = "-1033330";
            } else {
                ref.current.style.zIndex = "5000";
            }

        }
        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", posicionamientoAlertas)
        return () => {
            window.removeEventListener("mousemove", posicionamientoAlertas)
            window.removeEventListener("resize", resize)
        }

    }, [rects])

    return (
        <div
            ref={ref}
            id="contenedor-alertas"
            className="position-fixed "
            style={{ zIndex: "5000", maxHeight: "h-100", right: "1%", bottom: "1%" }} >
            {
                alertas.length > 0 && alertas.map((item, index) => <Alerta key={index} {...item} />)
            }
        </div>
    );
};