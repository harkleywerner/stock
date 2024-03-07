import { Badge, CloseButton, Modal } from "react-bootstrap";
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
            backdrop={true}
            show={mostrar}>
            <Modal.Header
                className="bg-dark text-white d-flex justify-content-between w-100"
                onHide={alternarMostrar}>
                <Modal.Title className="d-inline-flex gap-2">
                    Lote {`#${lote}`}
                    <Link
                        className="badge bg-secondary my-auto transition"
                        to="/stock/gestion">
                        <i className="fa-solid  fa-link text-white"></i>
                    </Link>
                </Modal.Title>
                <CloseButton onClick={alternarMostrar} variant="white" />
            </Modal.Header>
            <Modal.Body className="shadow gap-4 d-flex flex-column ">
                <div className="d-flex align-items-center gap-2">
                    <Badge
                        style={{ minWidth: "40px", maxWidth: "40px" }}
                        className="py-2 fs-6"
                        bg="info">{cambios_pendientes}</Badge>
                    <p className="m-0">Cambios pendientes.</p>
               
                </div>
                <div className="m-auto">
                    <small
                        onClick={redirectStock}
                        className=" text-decoration-underline  text-center transition link-danger  cursor-pointer">
                        ¿Seguro deseas continuar, perderas todo el progreso?
                    </small>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AlertaDePendientes