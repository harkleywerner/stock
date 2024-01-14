import { Container, Row } from "react-bootstrap";
import { NavHeader } from "../containers/SistemaDeStock/NavHeader/NavHeader";
import { NavBarSecciones } from "../containers/SistemaDeStock/NavbarSecciones";
import { ContenedorDeStock } from "../containers/SistemaDeStock/ContenedorDeStock/ContenedorDeStock";

 const SistemaDeStock = () => {
    return (
        <Container fluid className='p-0 overflow-hidden d-flex flex-column vh-100'>

            <Row id="nav" className='m-0 '>
                <NavHeader />
                <NavBarSecciones />
            </Row>

            <Row
                as={"main"}
                className='h-100 m-0 flex-grow-1 mt-2 overflow-hidden'>
                <ContenedorDeStock />
            </Row>

        </Container>
    );
};

export default SistemaDeStock