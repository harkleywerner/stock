import { ButtonSombreado } from "@/components//ButtonSombreado"
import SpinnerLoader from "@/components//SpinnerLoader"
import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider"
import { memo, useContext } from "react"
import { Card } from "react-bootstrap"

export const CardProducto = memo(({
    verificarCantidad,
    nombre,
    alternarMostrar,
    loader
}) => {
    const { sucursal_info } = useContext(informacionInicialContext)

    const { loggeado } = sucursal_info

    return (
        <Card
            className={`m-3 transition  cursor-pointer `}
            style={{ width: '18rem', opacity: "0.9", height: "7rem", border: "1.5px solid #e9d6bf" }}>
            <Card.Title className=" m-0 d-flex justify-content-center p-1 ">
                <p
                    style={{ fontSize: "16px", minHeight: "40px", maxHeight: "40px", color: "#555" }}
                    className="m-0 fs-6 text-truncate text-center text-wrap font d-flex align-items-center justify-content-center  fw-normal">{nombre}</p>
            </Card.Title>
            <Card.Body className={`d-flex overflow-hidden justify-content-${!loggeado ? "end" : "between"}  align-items-center`} >
                {

                    loggeado &&
                    <div style={{minWidth : "75px"}}>
                        <ButtonSombreado
                            background={"cc966b"}
                            border={"b36843"}
                            onClick={alternarMostrar}
                            element="button"
                            className="w-100"
                        >
                            {loader ? <SpinnerLoader size="sm" position="centered" color="white" /> : <small className="fs-6">Retirar</small>}
                        </ButtonSombreado>
                    </div>
                }
                <span
                    style={{ border: "1px solid #e9d6bf", fontSize: "18px", color: "#555", width: "40px", height: "40px", letterSpacing: "0px" }}
                    className="m-0 rounded-5  align-items-center d-flex justify-content-center  ">{verificarCantidad}</span>
            </Card.Body>
        </Card>
    )
})
