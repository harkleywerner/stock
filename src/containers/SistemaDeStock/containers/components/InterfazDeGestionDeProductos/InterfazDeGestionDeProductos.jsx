import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
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

    useEffect(() => {
        if (Object.keys(productoSeleccionado).length == 0) return
        insertarParametros({ ...productoSeleccionado })
    }, [productoSeleccionado])

    const refImperative = useRef()

    const verificacion = verificacionStock({ parametros, productoSeleccionado, stock, addProducto, editProducto })

    const onClick = () => {

        const refCantidad = parseInt(refImperative.current.cantidad)

        const validacion = verificacion({ refCantidad })

        if (!validacion) return

        alternarMostrar()
    }

    return (
        <Modal
            size="lg"
            show={mostrar}
            backdrop="static"
            onHide={alternarMostrar}>
            <Modal.Header className="d-flex justify-content-center h-100 w-100 px-0" >
                <BuscadorDeProductos insertarParametros={insertarParametros} />
            </Modal.Header>
            <Modal.Body style={{ height: "350px" }}>
                <ModalBody
                    refImperative={refImperative}
                    parametros={parametros} />
            </Modal.Body>
            <Modal.Footer className="d-flex p-1 justify-content-center">
                <Button
                    onClick={onClick}
                    style={{ background: "#57BDC6" }}
                    className="p-2 fs-5 w-50 border-0 transition">
                    {
                        productoSeleccionado ? "Guardar cambios" : "Agregar item"
                    }
                </Button>
                <Button
                    onClick={alternarMostrar}
                    variant="secondary"
                    className="p-2 fs-5 w-50  border-0 transition">
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default InterfazDeGestionDeProductos