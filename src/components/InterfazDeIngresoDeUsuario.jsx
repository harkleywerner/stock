import { Button, Form, Modal } from "react-bootstrap"
import wrapperAlerta from "../provider/NotificacionesProvider/wrapperNotificaciones"
import { memo } from "react"
import { useForm } from "../hooks/useForm"
import { useValidarForm } from "../hooks/useValidarForm"

const ButtonIngreso = memo(({ onSubmit, validated }) => {
  
    return (
        <Button
            type="submit"
            onSubmit={onSubmit}
            style={{ background: "#4bb9b7" }}
            className="transition w-100 border-0 mt-5 fs-5">
            Ingresar
        </Button>
    )
})

const FormularioDeIngreso = () => {

    const { form, changeForm, onSubmit } = useForm({ contraseña: "" })

    const { handleSubmit, validated } = useValidarForm()

    const verificacion = form.contraseña.length < 6
    return (
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    autoComplete="off"
                    required
                    isValid={!verificacion && validated}
                    isInvalid={verificacion && validated}
                    onChange={changeForm}
                    name="contraseña"
                    value={form.contraseña}
                    placeholder="Ingresa la contraseña"
                    maxLength={6}
                    minLength={6}
                    aria-labelledby="contraseña del usuario"
                    className="fs-4 text-secondary"
                    type="password">
                </Form.Control>
                <Form.Control.Feedback type="invalid">Contraseña incorrecta, debes ingresar 6 caracteres!</Form.Control.Feedback>
            </Form.Group>
            <ButtonIngreso onSubmit={onSubmit} validated={!verificacion && validated} />
        </Form>

    )
}

const InterfazDeIngresoDeUsuario = memo(({ establercerAlerta, alternarMostrar, mostrar, nombre, apellido }) => {

    return (
        <Modal
            show={true}
            onHide={alternarMostrar}>
            <Modal.Header closeButton >
                <Modal.Title className="text-secondary text-uppercase fs-4 text-truncate">{nombre} {apellido}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormularioDeIngreso />
            </Modal.Body>
        </Modal>
    )
})



export default wrapperAlerta(InterfazDeIngresoDeUsuario)