import { DropDownSucursal } from "@/containers//SistemaDeStock/components/DropDownSucursal";
import { Container, Nav, Navbar } from "react-bootstrap";
import { DropDownFilterCategoria } from "../../components/DropDownFilterCategoria";
import SubirNuevoStock from "./SubirNuevoStock";
import AgregarItem from "./AgregarItem";


const NavDeNuevoStockContainer = () => {

    return (
        <Navbar
            expand="lg"

            className="d-flex justify-content-center align-items-center position-relative p-0 ">
            <Container

                fluid className="m-0 shadow fondo-verde  py-3">

                <div className="d-flex justify-content-between d-lg-none w-100">
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="bg-none z-1 border-0 bg-white" />
                    <DropDownSucursal />
                </div>

                <Navbar.Collapse
                    id="basic-navbar-nav">
                    <Nav className="px-1 text-white fs-2 d-flex justify-content-around align-items-center w-100">

                        <AgregarItem />

                        <Nav.Item>
                            <DropDownFilterCategoria />
                        </Nav.Item>

                        <SubirNuevoStock />

                    </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default NavDeNuevoStockContainer
