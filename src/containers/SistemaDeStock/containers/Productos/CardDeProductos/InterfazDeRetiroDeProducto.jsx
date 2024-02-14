import { useForm } from "@/hooks/useForm";
import { memo } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { verificarCantidadesHelper } from "./helper/verificarCantidades.helper";
import { useDispatch } from "react-redux";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";

const InterfazDeRetiroDeProducto = memo((
    {
        alternarMostrar,
        mostrar,
        setCantidadActual,
        cantidadActual,
        nombre
    }
) => {

    const dispatch = useDispatch()

    const { devoluciones_permitidas, cantidad_total } = cantidadActual

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const cantidadEnt = parseInt(cantidad) || 0

    const { evaluarCantidad } = verificarCantidadesHelper({ cantidadActual, cantidadEnt })

    const enviarCantidad = () => {

        if (evaluarCantidad == 0) return

        const devolucionesTotal = devoluciones_permitidas - evaluarCantidad

        const calcularCantidad = cantidad_total - evaluarCantidad

        setCantidadActual({ devoluciones_permitidas: devolucionesTotal, cantidad_total: calcularCantidad })

        const text = cantidadEnt < 0 ? "Devolviste" : "Retiraste"

        const toast = { texto: `${text} ${Math.abs(evaluarCantidad)} unidade/s de ${nombre}`, tipo: "success" }

        dispatch(generarToast({ ...toast }))

        restablecerFormulario()
    }

    return (
        <Modal
            show={mostrar}
            animation={true}
            onHide={alternarMostrar}>
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center flex-column">
                    <div className="d-flex justify-content-start w-100">
                        <p className="m-0 text-secondary fw-normal">
                            {nombre}
                        </p>
                        <p className="m-0 fs-5 font text-secondary fw-normal mt-1 mx-2">
                            {evaluarCantidad == "" ? 0 : evaluarCantidad}
                            /
                            {cantidad_total}
                        </p>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Control
                    type="number"
                    className="fs-4 font text-secondary"
                    onChange={changeForm}
                    name="cantidad"
                    value={evaluarCantidad == 0 ? "" : evaluarCantidad}
                    placeholder="Ingresa la cantidad"
                />
                <small
                    style={{ fontSize: "12px" }}
                    className=" text-danger fw-normal  mx-1 ">Puedes devolver {Math.abs(devoluciones_permitidas)} unidade/s</small>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={enviarCantidad}
                    style={{ background: "#57BDC6" }}
                    className="w-100 border-0 fs-5 transition">
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>
    );
})

export default InterfazDeRetiroDeProducto