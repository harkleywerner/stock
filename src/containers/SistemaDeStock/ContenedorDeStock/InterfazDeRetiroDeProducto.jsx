import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "@/hooks/useForm";
import wrapperAlerta from "@/provider//AlertaProvider/wrapperAlerta";

const sumarRetirados = (listaDeRetirados) => {
    if(!listaDeRetirados) return
    return listaDeRetirados.reduce((acc, current) => {
        return current.cantidad -( current.retirado || 0)

    }, 0)
}

const InterfazDeRetiroDeProducto = ({ alternarMostrar, mostrar, setListaDeRetirados, establercerAlerta, parametros, listaDeRetirados }) => {

    const { nombre, listaDeCantidades, cantidadTotal } = parametros

    const buscarLista = listaDeRetirados[nombre]

    const cantidadActual = buscarLista ? sumarRetirados(buscarLista) : cantidadTotal

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const cantidadPositiva = Math.abs(parseInt(cantidad)) || 0

    const evaluarCantidad = cantidadPositiva > cantidadActual ? cantidadActual : cantidadPositiva

    const enviarCantidad = () => {

        if (evaluarCantidad <= 0) return
        establercerAlerta({ texto: `Retirtaste ${evaluarCantidad} items de ${nombre}`, tipo: "success", id: "success-retiro" })

        let total = form.cantidad

        const mapeo = listaDeCantidades.map(item => {

            let obj = null
            if (total > 0) {
                obj = { ...item, retirado: Math.min(item.cantidad, total) }
                total = total - item.cantidad
            }
            return obj ? obj : item

        })

        setListaDeRetirados({
            ...listaDeRetirados,
            [nombre]: mapeo
        })

        restablecerFormulario()
    }


    return (
        <Modal
            show={mostrar}
            animation={true}
            onHide={alternarMostrar}>
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                    <p className="m-0 text-secondary fw-normal">
                        {nombre}
                    </p>
                    <p className="m-0 fs-5 text-secondary fw-normal mt-1 mx-2">{evaluarCantidad == "" ? 0 : evaluarCantidad}<span className="font">/</span>{cantidadActual}</p>
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
};

export default wrapperAlerta(InterfazDeRetiroDeProducto)