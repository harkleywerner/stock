import { OverlayTrigger, Tooltip } from "react-bootstrap"

const tipos = {
    "expecting": {
        i: "fa-solid   fa-arrows-rotate",
        text: "Debes sincronizar con el minimo permitido.",
        color: "#0DCAF0"
    },
    "denied": {
        i: "fa-regular   fa-circle-xmark",
        text: "No puedes borrarlo.",
        color: "#D22F34"
    },
    "success": {
        i: "fa-regular fa-circle-check ",
        text: "Sincronizacion exitosa.",
        color: "#82CE40"
    },
    "warning": {
        i: "fa-solid fa-triangle-exclamation",
        text: "No se realizo ninguna sincronizacion,debido a que la cantidad minima es igual a la original",
        color : "#EACA06"
    }

}

const SincronizacionItems = ({ tipo }) => {

    const { i, text, color } = tipos[tipo]

    return (
        <OverlayTrigger
            overlay={<Tooltip ><small style={{ color }}>{text}</small></Tooltip>}
        >
            <i
                style={{ right: "-20px", top: "-5px", color }}
                className={`${i} cursor-pointer position-absolute`}></i>
        </OverlayTrigger >
    )
}

export default SincronizacionItems