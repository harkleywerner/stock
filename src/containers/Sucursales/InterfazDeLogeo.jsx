import { useForm } from "@/hooks//useForm";
import { Button, Form, Modal } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const InterfazDeLogeo = ({ alternarMostrar, mostrar }) => {

    const [search] = useSearchParams()
    const { changeForm, form } = useForm({ password: "" })
    const nombre = search.get("s")

    return (
        <Modal
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header
                className="border-3"
                closeButton>
                <Modal.Title className="text-secondary fw-bold">{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
                <Form.Control
                    onChange={changeForm}
                    placeholder={"Ingresa la contraseña"}
                    value={form.password}
                    name="password"
                    className="p-3 font fs-4"
                    type="password"
                    aria-labelledby="contraseña"
                    maxLength={6}
                />

                <p
                    style={{ visibility: "hidden" }}
                    className="m-0 text-danger pt-2 ms-1  fw-normal ">Contraseña incorrecta</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center border-3">
                <Button
                    style={{ background: "#4BB9B7" }}
                    className="w-100 transition fs-4 border-0">
                    Ingresar
                </Button>
                <Button
                    variant="none"
                    className="border-bottom fs-5 border-0 transition  p-0 text-secondary rounded-0">
                    <span className="mx-1 fw-normal">Ingresar como invitado</span>
                    <i className="fa-solid fs-4 fa-user-clock"></i>
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InterfazDeLogeo