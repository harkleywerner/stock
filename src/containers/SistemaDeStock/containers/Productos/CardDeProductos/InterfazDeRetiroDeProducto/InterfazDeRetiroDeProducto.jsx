import SpinnerLoader from "@/components//SpinnerLoader";
import { useForm } from "@/hooks/useForm";
import { memo, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import DropDownLote from "./DropDownLote/DropDownLote";
import ProductoContext from "./context/Producto.context";
import { verificarCantidadesHelper } from "./helper/verificarCantidades.helper";
import { ButtonSombreado } from "@/components//ButtonSombreado";

const InterfazDeRetiroDeProducto = memo((
    {
        alternarMostrar,
        mostrar,
        setCantidadActual,
        cantidadActual,
        nombre,
        loader,
        id_producto,
        apiCall,
        tipo
    }
) => {

    const { devoluciones_permitidas, cantidad_total, lote } = cantidadActual

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const cantidadEnt = parseInt(cantidad) || 0

    const { evaluarCantidad } = verificarCantidadesHelper({ cantidadActual, cantidadEnt })

    const enviar = async () => {
        if (tipo == "failed") return
        await apiCall({ evaluarCantidad })
        restablecerFormulario()
    }

    return (
        <Modal
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="d-flex flex-column align-items-start border-bottom mx-2 w-100">
                    <ProductoContext.Provider value={{ setCantidadActual }}>
                        <DropDownLote
                            id_producto={id_producto}
                            lote={lote}
                        />
                    </ProductoContext.Provider>
                    <div
                        style={{ color: "#555" }}
                        className="d-flex fs-6 mb-2 align-items-center justify-content-start w-100">
                        <p className="m-0 font  fw-normal mx-2">
                            {evaluarCantidad == "" ? 0 : evaluarCantidad}
                            /
                            {cantidad_total}
                        </p>
                        <p className="m-0 lh-1 fw-normal">
                            {nombre}
                        </p>

                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form.Control
                    type="number"
                    className="fs-5 text-secondary"
                    onChange={(e) => !loader && changeForm(e)}
                    name="cantidad"
                    value={evaluarCantidad == 0 ? "" : evaluarCantidad}
                    placeholder="Ingresa la cantidad"
                />
                <small
                    style={{ fontSize: "12px" }}
                    className=" text-danger fw-normal  mx-1 ">Puedes devolver {-devoluciones_permitidas} unidade/s</small>
            </Modal.Body>

            <Modal.Footer className="border-0">

                <ButtonSombreado
                    element="button"
                    background={"75D3CE"}
                    border={"2f9d9c"}
                    onClick={enviar}
                    className=" fs-5 transition w-100 cursor-pointer">
                    {
                        loader || tipo == "failed" ? <SpinnerLoader size="sm" /> : "Enviar"
                    }
                </ButtonSombreado>

            </Modal.Footer>

        </Modal>
    );
})

export default InterfazDeRetiroDeProducto