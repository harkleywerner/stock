import { Col, Container, Row } from "react-bootstrap";
import { NavDeGestion } from "./NavDeGestion";
import ContenedorDeTabla from "@/containers//SistemaDeStock/Components/ContenedorDeTabla/ContenedorDeTabla";
import { gestionDeStockContext } from "@/provider//GestionDeStockProvider/GestionDeStockProvider";
import { useContext } from "react";
import ScrollingInfinite from "../Components/ScrollingInfinite";
import { usePromiseHandler } from "@/hooks//usePromiseHandler";

export const UltimaTabla = () => {

    const { data, loader, obtenerDatos } = usePromiseHandler()
    const props = useContext(gestionDeStockContext)["ultimaTabla"]

    return (
        <ScrollingInfinite>
            <Col className="p-0 overflow-hidden h-100">
                <ContenedorDeTabla {...props} state={props.state} />
            </Col>
        </ScrollingInfinite>

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