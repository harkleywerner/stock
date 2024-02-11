import { Container, Row } from "react-bootstrap";
import { NavBarSecciones } from "./NavbarSecciones";
import ContenedorCards from "./ContenedorDeCards";


const ContenedorDeProductos = () => {

    return (

        <Container fluid className="p-0 h-100 overflow-hidden d-flex flex-column  m-0">

            <Row className="m-0 flex-grow-0">
                <NavBarSecciones />
            </Row>

            <Row className="m-0 h-100 flex-grow-1 overflow-hidden ">
                <ContenedorCards />
            </Row>
        </Container>
    )
}

export default ContenedorDeProductos
