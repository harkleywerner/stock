import { DropDownSucursal } from "@/components//DropDownSucursal";
import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { lazy } from "react";
import { Badge, Container, Nav, NavItem, Navbar } from "react-bootstrap";
import { DropDownFilterCategoria } from "../components/DropDownFilterCategoria";
import { addProducto, editProducto, sincronizarStockDb } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { useDispatch, useSelector } from "react-redux";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import axios from "axios";
import { calcularNuevoStockHelper } from "./helper/calcularNuevoStock.helper";
import SpinnerLoader from "@/components//SpinnerLoader";

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

const GuardarCambiosItem = wrapperNotificacionesServidor((
    {
        loader,
        data,
        generatePromise
    }
) => {

    const { stock, inicializado, stock_data_base = [], stock_info } = useSelector(state => state.gestion_stock)

    const dispatch = useDispatch()

    const dispatchToast = (input) => dispatch(generarToast(input))

    const subirStock = () => {

        if (!inicializado) return

        const cambios = calcularNuevoStockHelper({ stock, stock_data_base })

        const promesa = {
            method: "PUT", url: `stock/gestion`, id: "stock/gestion",
            data: { id_stock: stock_info.id_stock, lista_de_cambios: cambios },
        }

        if (cambios.length == 0) {
            dispatchToast(({ texto: "Debes realizar algun cambio.", tipo: "warning" }))
        }
        else {
            generatePromise({ promesas: [promesa] })
            dispatchToast({ texto: `El lote #${stock_info.lote} se guardo con exito`, tipo: "success" })
            dispatch(sincronizarStockDb(stock))
        }

    }

    return (
        <>
            {
                loader ? <SpinnerLoader position="y" /> :

                    <Nav.Item
                        onClick={subirStock}
                        className={`
            ${inicializado ? "hover-rosa transition cursor-pointer" : "opacity-50 cursor-block"}
              fs-5  p-1 justify-content-center  d-flex align-items-center
            `}>
                        <p className="m-0 fw-normal mx-1">Guardar cambios</p>
                        <i className="fa-solid fs-4 fa-cloud-arrow-down"></i>
                    </Nav.Item>
            }
        </>
    )
})

const StockLoteItem = () => {

    const { stock_info } = useSelector(state => state.gestion_stock)

    return (
        <NavItem
            className="text-decoration-none text-white  fs-3 p-1 justify-content-center  d-flex align-items-center">
            <Badge style={{ backgroundColor: "#814937" }} bg="none" className="shadow">Lote #{stock_info.lote}</Badge>
        </NavItem>

    )
}

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
                        <StockLoteItem />

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