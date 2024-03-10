import { useForm } from "@/hooks//useForm"
import { memo, useEffect, useRef } from "react"
import { Badge, Button, Form, Stack } from "react-bootstrap"
import { wrapperNotificacionesServidor } from "../wrapperNotificacionesServidor/wrapperNotificacionesServidor"
import axios from "axios"
import SpinnerLoader from "../SpinnerLoader"

const FormularioDeIngreso = ({
    form,
    changeForm,
    tipo
}) => {
    const verificacion = tipo == "denied"

    return (
        <Form.Group className="mx-4">
            <Form.Control
                style={{ boxShadow: "none" }}
                autoComplete="off"
                required
                isInvalid={verificacion}
                onChange={changeForm}
                name="contraseña"
                value={form.contraseña}
                placeholder="Contraseña"
                maxLength={6}
                minLength={6}
                aria-labelledby="contraseña del usuario"
                className="fs-5 p-1 text-center text-secondary"
                type="password">
            </Form.Control>
            <Form.Control.Feedback
                className="text-center"
                style={{ color: "#e84a7a" }}
                type="invalid">
                Contraseña incorrecta!
            </Form.Control.Feedback>
        </Form.Group>
    )
}

const AccordionIngreso = wrapperNotificacionesServidor(({
    generatePromise,
    loader,
    apiData,
    id_usuario,
    establecerLoggeado
}) => {

    const { form, changeForm } = useForm({ contraseña: "" })

    const ref = useRef()

    const { tipo } = apiData["usuario"] || {}

    const cancelToken = axios.CancelToken.source()

    const apiCall = () => {

        if (form.contraseña.length >= 6) return

        const promesa = {
            method: "POST",
            url: "usuarios",
            data: { id_usuario, contraseña: form.contraseña },
            id: "usuario",
            cancelToken: cancelToken.token
        }

        generatePromise({ promesa })
    }


    useEffect(() => {

        ref.current.focus()

        if (tipo == "success") {
            establecerLoggeado({ id_usuario })
        }
        return () => cancelToken.cancel()
    }, [tipo])

    return (
        <section
            style={{ outline: "none" }}
            tabIndex={0}
            ref={ref}
            className="mt-3">
            <FormularioDeIngreso
                changeForm={changeForm}
                form={form}
                tipo={tipo}
            />

            <div
                className=" d-flex mt-2">
                {
                    loader ? <SpinnerLoader size="md" position="centered" /> :
                        <Button
                            onClick={apiCall}
                            style={{ backgroundColor: "#f1759e", borderBottom: "3px solid #d72b56" }}
                            variant="none"
                            className="text-center text-white fs-5 transition m-auto">
                            Ingresar
                        </Button>
                }
            </div>
        </section>
    )
})

const Usuario = memo(({
    nombre,
    apellido,
    accordion,
    establecerAccordion,
    id_usuario,
    loggeado,
    establecerLoggeado
}) => {

    const onClick = () => {

        if (loggeado) return

        establecerAccordion(id_usuario)
    }

    return (
        <div
            className=" rounded-3 my-2 p-1 "
            style={{ backgroundColor: `${!loggeado ? "#86d4da" : "#2c808e"}`, borderBottom: "3px solid #2c808e" }}
        >
            <Stack
                onClick={onClick}
                direction="horizontal"
                gap={2}
                className="align-items-center ms-2 cursor-pointer">
                {
                    !loggeado &&
                    <i style={{ color: "#2c808e" }}
                        className={`fa-solid  mt-1 fs-5 ${accordion ? "fa-chevron-up" : "fa-chevron-down"}`} />
                }
                {
                    loggeado && <i
                        style={{ color: "#86d4da" }}
                        className="fa-solid fs-5 mt-1 fa-unlock"></i>
                }
                <p className="m-0 text-white fs-5">{nombre} {apellido}</p>
            </Stack>
            {
                accordion && !loggeado &&
                <AccordionIngreso id_usuario={id_usuario} establecerLoggeado={establecerLoggeado} />
            }
        </div >
    )
})

export default Usuario