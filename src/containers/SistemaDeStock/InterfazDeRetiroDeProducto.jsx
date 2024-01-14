import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "@/hooks/useForm";


const InterfazDeRetiroDeProducto = ({ alternarMostrar, mostrar, setContador, parametros, contador }) => {

    const { nombre, cantidad: cantidadA } = parametros

    const buscadorContador = contador[nombre] || 0

    const cantidadActual = cantidadA - buscadorContador

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const cantidadPositiva = Math.abs(parseInt(cantidad)) || 0

    const evaluarCantidad = cantidadPositiva > cantidadActual ? cantidadActual : cantidadPositiva

    const enviarCantidad = () => {
        setContador({
            ...contador,
            [nombre]: buscadorContador + evaluarCantidad
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

export default InterfazDeRetiroDeProducto