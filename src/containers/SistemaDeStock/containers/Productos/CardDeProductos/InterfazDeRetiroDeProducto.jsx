import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { useForm } from "@/hooks/useForm";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { memo } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { verificarCantidadesHelper } from "./helper/verificarCantidades.helper";
import DropDownLote from "./DropDownLote";

const InterfazDeRetiroDeProducto = memo((
    {
        alternarMostrar,
        mostrar,
        setCantidadActual,
        cantidadActual,
        nombre,
        generatePromise,
        loader,
        id_producto
    }
) => {

    const dispatch = useDispatch()

    const { devoluciones_permitidas, cantidad_total } = cantidadActual

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const cantidadEnt = parseInt(cantidad) || 0

    const { evaluarCantidad } = verificarCantidadesHelper({ cantidadActual, cantidadEnt })

    const enviarCantidad = async () => {

        if (evaluarCantidad == 0 || loader) return

        const devolucionesTotal = devoluciones_permitidas - evaluarCantidad

        const retiroTotal = cantidad_total - evaluarCantidad

        const promesa = {
            method: "post", url: "trassaciones", id: "trassaciones",
            data: { cantidad: evaluarCantidad, id_producto },
        }

        await generatePromise({ promesas: [promesa] })

        setCantidadActual({ devoluciones_permitidas: devolucionesTotal, cantidad_total: retiroTotal })

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
            <Modal.Header  closeButton={!loader}>
                <Modal.Title className="d-flex align-items-center flex-column">
                {/* <DropDownLote id_producto={id_producto} /> */}
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
                            onClick={enviarCantidad}
                            style={{ background: "#57BDC6" }}
                            className="w-100 border-0 fs-5 transition">
                            Enviar
                        </Button>
                }

            </Modal.Footer>
        </Modal>
    );
})

export default wrapperNotificacionesServidor(InterfazDeRetiroDeProducto)