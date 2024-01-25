import { Button, Form, Modal } from "react-bootstrap"
import wrapperAlerta from "../provider/AlertaProvider/wrapperAlerta"
import { forwardRef, memo, useRef, useState } from "react"
import { useForm } from "../hooks/useForm"
import { useImperativeHandle } from "react"

const FormularioDeIngreso = forwardRef((props, ref) => {

    const { form, changeForm } = useForm({ contraseña: "" })

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    useImperativeHandle(ref, () => {
        return {
            contraseña: form.contraseña
        }
    })

    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    required
                    isValid={false}
                    onChange={changeForm}
                    name="contraseña"
                    value={form.contraseña}
                    placeholder="Ingresa la contraseña"
                    maxLength={6}
                    minLength={6}
                    aria-labelledby="ingreso de usuario"
                    className="fs-4 text-secondary"
                    type="password">

                </Form.Control>
                <Form.Control.Feedback type="invalid">Contraseña incorrecta!</Form.Control.Feedback>
            </Form.Group>
        </Form>

    )
})

const InterfazDeIngresoDeUsuario = memo(({ establercerAlerta, alternarMostrar, mostrar, nombre, apellido }) => {

    const formRef = useRef()

    const onClick = () => {
        console.log(formRef.current)
    }


    return (
        <Modal
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header closeButton >
                <Modal.Title className="text-secondary text-uppercase">{nombre} {apellido}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormularioDeIngreso ref={formRef} />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={onClick}
                    style={{ background: "#4bb9b7" }}
                    className="transition w-100 border-0 fs-5">
                    Ingresar
                </Button>
            </Modal.Footer>
        </Modal>
    )
})



export default wrapperAlerta(InterfazDeIngresoDeUsuario)