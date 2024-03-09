import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListadoDeItems from "./ListaDeItems/ListaDeItems";


const InterfazDeResumen = ({ mostrar, alternarMostrar }) => {

    const { resumen } = useSelector(state => state.gestion_stock)

    return (
        <Modal
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header className="border-bottom-0" closeButton>
                <Modal.Title className="text-center w-100 lh-2 fs-3 text-secondary border-bottom mx-2">Resumen</Modal.Title>
            </Modal.Header>
            <Modal.Body
                className="scrollbar d-flex flex-column"
                style={{ maxHeight: "300px", minHeight: "300px" }}
            >
                <ListadoDeItems resumen={resumen} />
                {
                    resumen.length == 0 &&

                    <h3 className="m-auto text-secondary fs-4 text-center">No hay cambios realizados...</h3>

                }
            </Modal.Body>
        </Modal>
    );
};

export default InterfazDeResumen