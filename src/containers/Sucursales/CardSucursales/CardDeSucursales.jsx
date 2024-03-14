
import { memo } from "react"
import { Card } from "react-bootstrap"
import IconSucural from "./icons/Sucursal.icon"

export const CardDeSucursales = memo(({ nombre , alternarMostrar,total_usuarios}) => {


    return (
        <Card
            onClick={alternarMostrar}
            className="rounded-4  cursor-pointer shadow border-0 transition m-3 m-md-4 m-xxl-5"
            style={{ width: "min-content", minWidth: "13.5rem", maxWidth: "13.5rem", maxHeight: "20rem",minHeight : "20rem" }}>

            <Card.Title
                style={{ borderBottom: "5px solid #E84A7A" }}
                className="fs-4 position-relative d-flex justify-content-center border-bottom border-5 border-secondary align-items-center text-secondary text-center p-2">

                <p
                    style={{ minHeight: "45px", maxHeight: "45px" }}
                    className="m-0 d-flex justify-content-center align-items-center text-wrap fs-5 overflow-hidden w-100">{nombre} </p>

                <i style={{ bottom: "-22px", rotate: "90deg" }}
                    className="fa-solid text-secondary fa-play position-absolute"></i>

            </Card.Title>

            <Card.Body className="p-0 d-flex flex-column mt-3 justify-content-center align-items-center">
                <div
                    style={{ height: "120px", width: "120px" }}
                    className="border d-flex justify-content-center border-secondary align-items-center border-3 rounded-circle">
                    <IconSucural />
                </div>

                <div className="d-flex pt-5 justify-content-center align-items-center ">
                    <i className="fa-solid text-secondary px-2 fs-2  fa-user-tie"></i>
                    <p className="m-0 text-secondary">{total_usuarios} usuarios</p>
                </div>
            </Card.Body>

        </Card>
    )
})