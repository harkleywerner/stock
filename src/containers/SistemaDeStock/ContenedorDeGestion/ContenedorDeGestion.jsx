import { Col, Container, Row } from "react-bootstrap";
import { NavDeGestion } from "./NavDeGestion";
import { TablaDeItems } from "./TablaDeItems";

const ContenedorDeGestion = () => {
    
    return (
        <Container fluid className="p-0">
            <Row className="m-0">
                <NavDeGestion />
            </Row>
            <Row className="m-0">
                <Col className=" pt-3 d-flex justify-content-center">
                    <TablaDeItems />
                </Col>
            </Row>
        </Container>
    );
};

export default ContenedorDeGestion