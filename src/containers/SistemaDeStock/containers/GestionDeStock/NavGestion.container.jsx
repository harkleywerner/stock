import { DropDownSucursal } from "@/components//DropDownSucursal";
import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";

import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { lazy } from "react";
import { Badge, Container, Nav, NavItem, Navbar } from "react-bootstrap";
import { DropDownFilterCategoria } from "../components/DropDownFilterCategoria";
import { addProducto, editProducto } from "@/redux//slice/gestionDeStock/gestionDeStock.slice";
import { useDispatch, useSelector } from "react-redux";
import { generarToast } from "@/redux//slice/toastNotificaciones/toastNotificaciones.slice";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";

const InterfazDeGestionDeProductos = lazy(() => import("../components/InterfazDeGestionDeProductos/InterfazDeGestionDeProductos"))


const NuevoItem = () => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { stock, inicializado } = useSelector(state => state.gestion_stock)

    const verificarStock = () => {
        if (!inicializado) return
        alternarMostrar()
    }

    return (
        <>
            <Nav.Item
                onClick={verificarStock}
                className={`
                ${inicializado ? "hover-rosa transition cursor-pointer" : "opacity-50 cursor-block"}
                 p-1 justify-content-center d-flex align-items-center
                `}>
                <p className="m-0 fw-normal fs-5 mx-1">Agregar item</p>
                <i className="fa-regular fs-4 fa-square-plus"></i>
            </Nav.Item>

            <SuspenseLoadingComponent >
                {
                    mostrar &&
                    <InterfazDeGestionDeProductos
                        alternarMostrar={alternarMostrar}
                        mostrar={mostrar}
                        addProducto={addProducto}
                        editProducto={editProducto}
                        stock={stock}
                    />
                }
            </SuspenseLoadingComponent>
        </>
    )
}

const GuardarCambiosItem = wrapperNotificacionesServidor(({ loader, data, generatePromise }) => {

    const { stock, inicializado } = useSelector(state => state.gestion_stock)

    const dispatch = useDispatch()

    const dispatchToast = (input) => dispatch(generarToast(input))

    const subirStock = () => {

        if (!inicializado) return

        if (stock.length == 0) {
            dispatchToast(({ texto: "No puedes subir un stock vacio", tipo: "warning" }))
        }
        else {
            dispatchToast({ texto: "El stock  403 se guardo con exito", tipo: "success" })
        }

    }

    return (
        <Nav.Item
            onClick={subirStock}
            className={`
            ${inicializado ? "hover-rosa transition cursor-pointer" : "opacity-50 cursor-block"}
              fs-5  p-1 justify-content-center  d-flex align-items-center
            `}>
            <p className="m-0 fw-normal mx-1">Guardar cambios</p>
            <i className="fa-solid fs-4 fa-cloud-arrow-down"></i>
        </Nav.Item>
    )
})


const NavDeGestionContainer = () => {
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

                        <NavItem
                            className="text-decoration-none text-white  fs-3 p-1 justify-content-center  d-flex align-items-center">
                            <Badge style={{ backgroundColor: "#814937" }} bg="none" className="shadow">Stock #555</Badge>
                        </NavItem>

                        <NuevoItem />

                        <Nav.Item>
                            <DropDownFilterCategoria />
                        </Nav.Item>
                        <GuardarCambiosItem />
                    </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
};


export default NavDeGestionContainer