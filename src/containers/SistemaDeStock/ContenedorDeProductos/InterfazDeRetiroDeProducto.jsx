import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "@/hooks/useForm";
import { memo } from "react";
import shortUUID from "short-uuid";
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";

const InterfazDeRetiroDeProducto = memo((
    {
        alternarMostrar,
        mostrar,
        setListaDeRetirados,
        establecerToast,
        parametros,
        listaDeRetirados
    }
) => {

    const buscarLista = listaDeRetirados[parametros.nombre] || parametros

    const { nombre, cantidad_total, devoluciones_permitidas } = buscarLista

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const cantidadEnt = parseInt(cantidad) || 0

    const verificarDevoluciones = cantidadEnt > devoluciones_permitidas ? cantidadEnt : devoluciones_permitidas

    const verificarRetiros = cantidadEnt > cantidad_total ? cantidad_total : cantidadEnt

    const evaluarCantidad = Math.sign(cantidadEnt) == -1 ? verificarDevoluciones : verificarRetiros


    const enviarCantidad = () => {

        if (evaluarCantidad == 0) return

        const devolucionesTotal = devoluciones_permitidas - evaluarCantidad
        const calcularCantidad = cantidad_total - evaluarCantidad

        setListaDeRetirados({
            ...listaDeRetirados,
            [nombre]: {
                ...parametros,
                cantidad_total: calcularCantidad,
                devoluciones_permitidas: devolucionesTotal
            }
        })

        const text = cantidadEnt < 0 ? "Devolviste" : "Retiraste"

        establecerToast({ texto: `${text} ${Math.abs(evaluarCantidad)} unidade/s de ${nombre}`, tipo: "success" })

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

export default wrapperNotificaciones(InterfazDeRetiroDeProducto)