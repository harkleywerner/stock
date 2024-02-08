import { memo } from "react";
import { Col } from "react-bootstrap";
import TablaDeItems from "./TablaDeItems";

const MensajeDeContenedorVacio = () => {

    return (
        <p className="text-white fw-normal fs-3 h-100  d-flex justify-content-center align-items-center">
            No se encontraron items
            <span className="font">...</span>
        </p>
    )
}

const ContenedorDeTabla = memo((props) => {


    const nuevoEstado = props.state

    return (
        <Col className="d-flex flex-column justify-content-between p-2   h-100  align-items-center w-100">
            {
                nuevoEstado.length == 0 ?
                    <MensajeDeContenedorVacio />
                    :
                    <TablaDeItems {...props} state={nuevoEstado} />
            }
        </Col>
    );
})

export default ContenedorDeTabla

