import { DropDownSucursal } from "@/components//DropDownSucursal";
import { Container, Nav, Navbar } from "react-bootstrap";
import { DropDownFilterCategoria } from "./DropDownFilterCategoria";

export const NavDeGestion = () => {
    return (
        <Navbar
            expand="lg"
            className="d-flex justify-content-center align-items-center position-relative p-0 ">
            <Container fluid className="m-0 shadow  fondo-verde  py-3">
                <div className="d-flex justify-content-between d-lg-none w-100">
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="bg-none z-1 border-0 bg-white" />

                    <DropDownSucursal />
                </div>
                <Navbar.Collapse
                    id="basic-navbar-nav">
                    <Nav className="px-1 text-white fs-2 d-flex justify-content-around align-items-center w-100">
                        <Nav.Item className="cursor-pointer hover-rosa fs-3 transition p-1 justify-content-center  d-flex align-items-center" >
                            <p className="m-0  fw-normal fs-4 mx-1">nuevo stock</p>
                            <i className="fa-solid fs-4 fa-box-open"></i>
                        </Nav.Item>
                        <Nav.Item className="cursor-pointer hover-rosa fs-3 transition p-1 justify-content-center  d-flex align-items-center" >
                            <p className="m-0  fw-normal fs-4 mx-1">Agregar item</p>
                            <i className="fa-regular  fs-4 fa-square-plus"></i>
                        </Nav.Item>
                        <Nav.Item>
                        <DropDownFilterCategoria/>
                        </Nav.Item>
                        {/* <Nav.Item className="cursor-pointer hover-rosa fs-3 transition p-1 justify-content-center  d-flex align-items-center" >
                            <p className="m-0  fw-normal fs-4 mx-1">Editar ultimo stock</p>
                            <i className="fa-solid fs-4 fa-wand-magic-sparkles"></i>
                        </Nav.Item> */}

                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
};


