import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { useForm } from "@/hooks//useForm";
import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";
import { memo, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { invitadoSucursalHelper } from "./helpers/invitadoSucursal.helper";
import logginSucursalHelper from "./helpers/logginSucursal.helper";

const InterfazDeLogeo = ({
    alternarMostrar,
    mostrar,
    nombre,
    id_sucursal,
    generatePromise,
    apiData,
    loader
}) => {

    const { establecerInformacion } = useContext(informacionInicialContext)

    const { changeForm, form } = useForm({ contraseña: "" })

    const { contraseña } = form

    const { tipo } = apiData["loggin"] || {}

    const dataInvitado = apiData["invitado"]

    const envioLoggin = logginSucursalHelper(
        {
            tipo, generatePromise, loader,
            data: { id_sucursal, contraseña },
            establecerInformacion,
            nombre
        }
    )

    const ingresarComoInvitado = invitadoSucursalHelper({
        generatePromise,
        dataInvitado,
        data: { id_sucursal, nombre, loggeado: false },
        establecerInformacion
    })


    return (
        <Modal
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header
                className="border-3"
                closeButton={!loader}>
                <Modal.Title className="text-secondary fw-bold">{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
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
                    style={{ visibility: `${!loader && tipo == "denied" ? "visible" : "hidden"}` }}
                    className="m-0 text-danger pt-2 ms-1  fw-normal ">Contraseña/usuario incorrecto...</p>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center border-3">

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