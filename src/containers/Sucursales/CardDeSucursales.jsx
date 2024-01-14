import IconIceCream from "@/components//IconIceCream"
import IconSucural from "@/components//IconSucural"
import { memo } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"


export const CardDeSucursales = memo(({ insertarParametros, objecto, alternarMostrar }) => {

    const { nombre, id } = objecto

    const onClick = () => {
        insertarParametros(objecto)
        alternarMostrar(true)
    }

    return (
        <Link
            className="text-decoration-none"
            to={`?s=${nombre}&id=${id}`}>
            <Card
                onClick={onClick}
                className="rounded-4 cursor-pointer shadow transition m-5"
                style={{ width: '18rem' }}>

                <Card.Title
                    style={{ borderBottom: "5px solid #E84A7A" }}
                    className="fs-4 position-relative d-flex justify-content-center border-bottom border-5 border-secondary align-items-center text-secondary text-center p-3">

                    <p className="m-0">{nombre}</p>

                    <i style={{ bottom: "-22px", rotate: "90deg" }}
                        className="fa-solid text-secondary fa-play position-absolute"></i>

                </Card.Title>

                <Card.Body className="p-0 d-flex flex-column mt-4 justify-content-center align-items-center">
                    <div
                        style={{ height: "150px", width: "150px" }}
                        className="border d-flex justify-content-center border-secondary align-items-center border-3 rounded-circle">
                        <IconSucural />
                    </div>

                    <div className="d-flex pt-3 justify-content-center align-items-center ">
                        <i className="fa-solid text-secondary px-2 fs-2  fa-user-tie"></i>
                        <p className="m-0 text-secondary">5 usuarios</p>
                    </div>

                    <div className="d-flex pt-2 pb-1 justify-content-center  align-items-center ">
                        <IconIceCream />
                        <p className="m-0 mt-2 text-secondary">103 items</p>
                    </div>

                </Card.Body>

            </Card>
        </Link>
    )
})