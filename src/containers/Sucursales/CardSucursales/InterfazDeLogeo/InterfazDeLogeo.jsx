import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { useForm } from "@/hooks//useForm";
import { memo, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { invitadoSucursalHelper } from "./helpers/invitadoSucursal.helper";
import logginSucursalHelper from "./helpers/logginSucursal.helper";
import { useNavigate } from "react-router-dom";

const InterfazDeLogeo = ({
    alternarMostrar,
    mostrar,
    nombre,
    id_sucursal,
    generatePromise,
    apiData,
    loader
}) => {


    const { changeForm, form } = useForm({ contraseña: "" })

    const { contraseña } = form

    const { invitado = {}, login = {} } = apiData

    const nav = useNavigate()


    const envioLoggin = logginSucursalHelper(
        {
            generatePromise, loader,
            data: { id_sucursal, contraseña },
        }
    )

    const ingresarComoInvitado = invitadoSucursalHelper({
        generatePromise,
        data: { id_sucursal, nombre, loggeado: false },
    })

    useEffect(() => {
        if (invitado?.tipo == "success" || login?.tipo == "success") {
            nav("/stock")
        }
    }, [loader])


    return (
        <Modal
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header
                className="border-0 "
                closeButton={!loader}>
                <Modal.Title className="text-secondary text-center pb-2 border-bottom w-100 fw-bold">{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-3">
                <Form.Control
                    onChange={(e) => !loader && changeForm(e)}
                    placeholder={"Ingresa la contraseña"}
                    value={contraseña}
                    name="contraseña"
                    className={`p-3 font border-2 fs-4`}
                    type="password"
                    aria-labelledby="contraseña"
                    maxLength={6}
                />
                <p
                    style={{ visibility: `${!loader && login?.tipo == "denied" ? "visible" : "hidden"}` }}
                    className="m-0 text-danger fw-normal ">Contraseña/usuario incorrecto...</p>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center border-0">

                {
                    loader ?
                        <SpinnerLoader size="md" color="dark" /> :
                        <>
                            <Button
                                onClick={envioLoggin}
                                style={{ background: "#75d3ce", borderBottom: "4px solid #2f9d9d" }}
                                className="w-100 transition fs-4 border-top border-start border-end rounded-3 border-bottom-1">
                                Ingresar
                            </Button>

                            <Button
                                onClick={ingresarComoInvitado}
                                variant="none"
                                className="border-bottom fs-5 border-0 transition  p-0 text-secondary rounded-0">
                                <span className="mx-1 fw-normal">Ingresar como invitado</span>
                                <i className="fa-solid fs-4 fa-user-clock"></i>
                            </Button>
                        </>

                }

            </Modal.Footer>

        </Modal>
    );
};

export default wrapperNotificacionesServidor(memo(InterfazDeLogeo))