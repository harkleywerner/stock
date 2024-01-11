import { Container, Nav, Navbar } from "react-bootstrap"

export const NavBarSecciones = () => {

    return (
        <Navbar expand="md" className="bg-body-tertiary border-bottom border-3">
            <Container fluid className="m-0 p-0 py-1">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav as={"ul"} className="px-1  d-flex justify-content-between w-100">
                        <Nav.Item as={"li"} >Todos</Nav.Item>
                        <Nav.Item as={"li"}>Cremas</Nav.Item>
                        <Nav.Item as={"li"}>Dulce de leches</Nav.Item>
                        <Nav.Item as={"li"}>Aguas</Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}