import { Button, Modal } from "react-bootstrap";
import { BuscadorDeProductos } from "./BuscadorDeProductos/BuscadorDeProductos";
import { useEffect, useRef } from "react";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { ModalBody } from "./ModalBody";
import { useDispatch } from "react-redux";
import { generarToast } from "@/redux//slice/toastNotificaciones/toastNotificaciones.slice";
import verificacionStock from "./helpers/verificiarStock.helper";

const InterfazDeGestionDeProductos = (
    {
        alternarMostrar,
        mostrar,
        productoSeleccionado,
        stock,
        editProducto,
        addProducto
    }
) => {

    const { insertarParametros, parametros } = useEstablecerParametros()

    useEffect(() => {
        if (!productoSeleccionado) return
        insertarParametros({ ...productoSeleccionado })
    }, [productoSeleccionado])

    const refImperative = useRef()

    const dispatch = useDispatch()

    const dispatchToast = (input) => dispatch(generarToast(input))

    const onClick = () => {

        const refCantidad = parseInt(refImperative.current.cantidad)

        const { tipo, toast } = verificacionStock({ parametros, productoSeleccionado, refCantidad, stock })

        if (tipo == "edit") {
            dispatch(editProducto({
                ...parametros,
                id_producto: productoSeleccionado.id_producto,
                id_actual: parametros.id_producto,
                cantidad: refCantidad
            }))
        } else if (tipo == "add") {
            dispatch(addProducto({ ...parametros, cantidad: refCantidad }))
        }

        dispatchToast(toast)

        if (["empty", "found"].includes(tipo)) return

        alternarMostrar()
    }

    return (
        <Modal
            size="lg"
            show={mostrar}
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