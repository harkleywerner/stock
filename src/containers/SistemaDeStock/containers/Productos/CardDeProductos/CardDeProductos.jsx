import { Button, Card } from "react-bootstrap";
import { cardButton } from "@/styles/SistemaStock.module.css"
import { lazy, useCallback, useRef, useState } from "react";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";

const InterfazDeRetiroDeProducto = lazy(() => import("./InterfazDeRetiroDeProducto/InterfazDeRetiroDeProducto"))

const CardDeProductos = ({ item }) => {

    const { nombre, cantidad_total, devoluciones_permitidas, id_producto } = item

    const cantidadBackUp = useRef(item) // => Sirve para guardar el total de todos los lotes sin tener que volver hacer una llamada.

    const [cantidadActual, setCantidadActual] = useState({ devoluciones_permitidas, cantidad_total, id_stock: null })

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const verificarCantidad = cantidadActual.cantidad_total > 100 ? "99+" : cantidadActual.cantidad_total

    const setCantidad  = useCallback((data)=>{
        setCantidadActual(data)
    },[])


    return (
        <>
            <Card
                className={`m-3 transition  cursor-pointer `}
                style={{ width: '18rem', opacity: "0.9", height: "7rem" }}>
                <Card.Title className=" m-0 d-flex justify-content-center p-1 ">
                    <p
                        style={{ fontSize: "16px", minHeight: "40px", maxHeight: "40px" }}
                        className="m-0 w-75 border-bottom text-truncate text-center text-wrap d-flex align-items-center justify-content-center  fw-normal">{nombre}</p>
                </Card.Title>
                <Card.Body className="d-flex justify-content-between  align-items-center">
                    <Button
                        onClick={alternarMostrar}
                        className={cardButton}
                        variant="none">Retirar</Button>
                    <span
                        style={{ border: "1px solid #814937", fontSize: "18px", color: "#555", width: "40px", height: "40px", letterSpacing: "0px" }}
                        className="m-0 rounded-circle border-1 align-items-center d-flex justify-content-center  ">{verificarCantidad}</span>
                </Card.Body>
            </Card>
            <SuspenseLoadingComponent>
                {mostrar && <InterfazDeRetiroDeProducto
                    id_producto={id_producto}
                    setCantidadActual={setCantidad}
                    cantidadActual={cantidadActual}
                    nombre={nombre}
                    alternarMostrar={alternarMostrar}
                    cantidadBackUp={cantidadBackUp}
                    mostrar={mostrar} />}
            </SuspenseLoadingComponent>
        </>
    );
}


export default CardDeProductos