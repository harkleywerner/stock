import { Col, Container, Row } from "react-bootstrap";
import { NavDeGestion } from "./NavDeGestion";
import ContenedorDeTabla from "@/containers//SistemaDeStock/Components/ContenedorDeTabla/ContenedorDeTabla";
import { useFiltrosParams } from "@/hooks//useFiltrosParams";
import { gestionDeStockContext } from "@/provider//GestionDeStockProvider";
import { useContext } from "react";

export const UltimaTabla = () => {

    const props = useContext(gestionDeStockContext)["ultimaTabla"]

    const filtros = useFiltrosParams(props.state)

    return (
        <Col className="p-0 overflow-hidden h-100">
            <ContenedorDeTabla {...props} state={filtros} />
        </Col>

    );
};




const ContenedorDeGestion = () => {
          

    return (
        <Container fluid className="p-0 overflow-hidden  d-flex flex-column  h-100">

            <Row className="m-0 flex-grow-0">
                <NavDeGestion />
            </Row>
            <Row className="m-0 flex-grow-1 overflow-hidden  h-100 ">
                <UltimaTabla />
            </Row>
        </Container>
    );
};

export default ContenedorDeGestion