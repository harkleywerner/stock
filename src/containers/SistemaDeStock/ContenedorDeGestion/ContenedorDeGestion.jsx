import { Col, Container, Row } from "react-bootstrap";
import { NavDeGestion } from "./NavDeGestion";
import { Outlet, useLocation } from "react-router-dom";
import { UltimaTabla } from "./UltimaTabla";

const Tablas = () => {
    const { pathname } = useLocation()

    const splitPath = pathname.split("/")

    return (
        <Col className="h-100  p-0  py-3 d-flex justify-content-center">

            {
                splitPath.length == 3 ? <UltimaTabla /> : <Outlet />
            }

        </Col>
    )
}

const ContenedorDeGestion = () => {



    return (
        <Container fluid className="p-0 overflow-hidden  d-flex flex-column  h-100">
            <Row className="m-0 flex-grow-0">
                <NavDeGestion />
            </Row>
            <Row className="m-0 flex-grow-1 overflow-hidden  h-100 ">
                <Tablas />
            </Row>
        </Container>
    );
};

export default ContenedorDeGestion