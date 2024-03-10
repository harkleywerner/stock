import { ButtonSombreado } from "@/components//ButtonSombreado";
import { Badge, Button, CloseButton, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const AlertaDePendientes = ({
    mostrar,
    alternarMostrar,
    stock_info,
    redirectStock
}) => {

    const { lote, cambios_pendientes = 0 } = stock_info

    return (
        <Modal
            onHide={alternarMostrar}
            show={mostrar}>
            <Modal.Header
                className=" d-flex border-0 justify-content-between p-1 pe-3 w-100"
            >
                <Modal.Title className="text-secondary d-flex mx-4 align-items-center border-bottom w-100">
                    <Link
                        className="text-secondary transition fs-3 rounded-4 p-1 text-decoration-none my-auto transition"
                        to="/stock/gestion">
                        {`#${lote}`}
                    </Link>
                </Modal.Title>
                <CloseButton onClick={alternarMostrar} />
            </Modal.Header>
            <Modal.Body className="shadow gap-4 d-flex flex-column ">
                <div className="d-flex ms-2 align-items-center gap-2">
                    <Badge
                        style={{ backgroundColor: "#86d4da", borderBottom: "3px solid #57BDC6", minWidth: "40px", maxWidth: "40px" }}
                        className="py-2 fs-6"
                        bg="none"
                    >{cambios_pendientes}
                    </Badge>
                    <p className="m-0">Cambios pendientes.</p>

                </div>

                <ButtonSombreado
                    onClick={redirectStock}
                    background={"DE4E75"}
                    border={"b12540"}
                    className={"mx-1 transition"}
                >
                    <small
                        style={{ fontSize: "14px" }}
                        className="text-center transition text-white cursor-pointer">
                        ¿Seguro deseas continuar, perderas todo el progreso?
                    </small>
                </ButtonSombreado>
            </Modal.Body>
        </Modal>
    );
};

export default AlertaDePendientes