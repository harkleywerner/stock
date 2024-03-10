import { ButtonSombreado } from "@/components//ButtonSombreado";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { BuscadorDeProductos } from "./BuscadorDeProductos/BuscadorDeProductos";
import { ModalBody } from "./ModalBody";
import verificacionStock from "./helpers/verificiarStock.helper";

const InterfazDeGestionDeProductos = (
    {
        alternarMostrar,
        mostrar,
        productoSeleccionado = {},
        stock,
        editProducto,
        addProducto,
    }
) => {

    const { insertarParametros, parametros } = useEstablecerParametros()

    const keys = Object.keys(productoSeleccionado).length

    useEffect(() => {
        if (keys == 0) return
        insertarParametros({ ...productoSeleccionado })
    }, [productoSeleccionado])

    const refImperative = useRef()

    const verificacion = verificacionStock({ parametros, productoSeleccionado, stock, addProducto, editProducto, keys })

    const onClick = () => {

        const refCantidad = parseInt(refImperative.current)

        verificacion({ refCantidad })
    }

    return (
        <Modal
            size="lg"
            show={mostrar}
            backdrop="static"
            onHide={alternarMostrar}>
            <Modal.Header className={`d-flex justify-content-center h-100 ${keys > 0 ? "border-0" : ""} w-100 px-0`} >
                {
                    keys == 0 &&
                    <BuscadorDeProductos insertarParametros={insertarParametros} />
                }
            </Modal.Header>
            <Modal.Body style={{ height: "350px" }}>
                <ModalBody
                    refImperative={refImperative}
                    parametros={parametros} />
            </Modal.Body>
            <Modal.Footer className="d-flex p-1 border-0 justify-content-center">
                <ButtonSombreado
                    onClick={onClick}
                    background={"86d4da"}
                    border={"2c808e"}
                    className="fs-5 transition"
                >
                    {
                        productoSeleccionado ? "Guardar cambios" : "Agregar item"
                    }
                </ButtonSombreado>

                <ButtonSombreado
                    onClick={alternarMostrar}
                    background={"808990"}
                    border={"5c636a"}
                    className="fs-5 px-5 transition"
                >
                    Cerrar
                </ButtonSombreado>
            </Modal.Footer>
        </Modal>
    );
}


export default InterfazDeGestionDeProductos