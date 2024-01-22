import { Col, Container, Row } from "react-bootstrap";
import ContenedorDeTabla from "@/components/ContenedorDeTabla/ContenedorDeTabla";
import { useContext } from "react";
import { gestionDeStockContext } from "@/provider//GestionDeStockProvider";
import { useFiltrosParams } from "@/hooks//useFiltrosParams";
import { NavDeNuevoStock } from "./NavDeNuevoStock";

const NuevaTabla = () => {

    const props = useContext(gestionDeStockContext)["nuevaTabla"]

    const filtros = useFiltrosParams(props.state)

    return (
        <Col className="p-0 overflow-hidden h-100">
        <ContenedorDeTabla {...props} state={filtros} />
    </Col>
    );
};




const ContendoDeNuevoStock = () => {
    return (
        <Container fluid className="p-0 overflow-hidden  d-flex flex-column  h-100">

            <Row className="m-0 flex-grow-0">
                <NavDeNuevoStock />
            </Row>
            <Row className="m-0 flex-grow-1 overflow-hidden  h-100 ">
                <NuevaTabla />
            </Row>
        </Container>
    );
};

export default ContendoDeNuevoStock