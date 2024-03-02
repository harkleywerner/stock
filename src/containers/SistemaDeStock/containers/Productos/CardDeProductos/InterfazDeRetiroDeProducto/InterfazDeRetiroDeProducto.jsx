import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { useForm } from "@/hooks/useForm";
import { memo } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DropDownLote from "./DropDownLote/DropDownLote";
import { verificarCantidadesHelper } from "./helper/verificarCantidades.helper";
import { envioCantidadHelper } from "./helper/envioCantidad.helper";
import ProductoContext from "./context/Producto.context";

const InterfazDeRetiroDeProducto = memo((
    {
        alternarMostrar,
        mostrar,
        setCantidadActual,
        cantidadActual,
        nombre,
        generatePromise,
        apiData, //Falta agregar para indicar si sale un error
        loader,
        id_producto,
        cantidadBackUp
    }
) => {

    const { devoluciones_permitidas, cantidad_total, id_stock, lote } = cantidadActual

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const cantidadEnt = parseInt(cantidad) || 0

    const { evaluarCantidad } = verificarCantidadesHelper({ cantidadActual, cantidadEnt })

    const enviar = envioCantidadHelper({
        devoluciones_permitidas,
        loader,
        evaluarCantidad,
        cantidad_total,
        cantidadBackUp,
        generatePromise,
        setCantidadActual,
        restablecerFormulario,
        id_stock,
        id_producto,
        lote
    })

    return (
        <Modal
            show={mostrar}
            animation={true}
            onHide={alternarMostrar}>
            <Modal.Header closeButton={!loader}>
                <Modal.Title className="d-flex flex-column align-items-start">
                    <ProductoContext.Provider value={{ cantidadBackUp, setCantidadActual, loteActual: lote }}>
                        <DropDownLote
                            id_producto={id_producto}
                            lote={lote}
                        />

                    </ProductoContext.Provider>
                    <div className="d-flex align-items-center justify-content-start w-100">
                        <p className="m-0 fs-5 font text-secondary fw-normal mx-2">
                            {evaluarCantidad == "" ? 0 : evaluarCantidad}
                            /
                            {cantidad_total}
                        </p>
                        <p className="m-0 fs-5 text-secondary lh-1 fw-normal">
                            {nombre}
                        </p>

                    </div>

                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control
                    type="number"
                    className="fs-4 text-secondary"
                    onChange={(e) => !loader && changeForm(e)}
                    name="cantidad"
                    value={evaluarCantidad == 0 ? "" : evaluarCantidad}
                    placeholder="Ingresa la cantidad"
                />
                <small
                    style={{ fontSize: "12px" }}
                    className=" text-danger fw-normal  mx-1 ">Puedes devolver {Math.abs(devoluciones_permitidas)} unidade/s</small>
            </Modal.Body>

            <Modal.Footer>
                {
                    loader ?
                        <SpinnerLoader
                            position="centered"
                            color="danger"
                            size="md" />
                        :
                        <Button
                            onClick={enviar}
                            style={{ background: "#57BDC6" }}
                            className="w-100 border-secondary fs-5 transition">
                            Enviar
                        </Button>
                }

            </Modal.Footer>

        </Modal>
    );
})

export default wrapperNotificacionesServidor(InterfazDeRetiroDeProducto)