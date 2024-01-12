import { Modal } from "react-bootstrap";


 const FormularioDeRetiroDeProducto = ({ alternarMostrar, mostrar }) => {
    return (
        <Modal show={mostrar} onHide={alternarMostrar}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
};

export default FormularioDeRetiroDeProducto