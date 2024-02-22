import { DropDownSucursal } from "@/components//DropDownSucursal";
import SpinnerLoader from "@/components//SpinnerLoader";
import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { lazy, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { DropDownFilterCategoria } from "../components/DropDownFilterCategoria";
import { addProducto, changeInicializado, editProducto, removerStock } from "@/store//reducer/nuevoStock/nuevoStock.slice";
import { useDispatch, useSelector } from "react-redux";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { memo } from "react";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";

const InterfazDeGestionDeProductos = lazy(() => import("../Components/InterfazDeGestionDeProductos/InterfazDeGestionDeProductos"))

const NuevoItem = () => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { stock, inicializado } = useSelector(state => state.nuevo_stock)

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

            <SuspenseLoadingComponent>
                {
                    mostrar &&
                    <InterfazDeGestionDeProductos
                        alternarMostrar={alternarMostrar}
                        mostrar={mostrar}
                        inicializado={inicializado}
                        addProducto={addProducto}
                        editProducto={editProducto}
                        stock={stock}
                    />
                }
            </SuspenseLoadingComponent>
        </>
    )
}

const SubirNuevoStockItem = wrapperNotificacionesServidor(memo(({ loader, generatePromise, apiData }) => {


    const { stock } = useSelector(state => state.nuevo_stock)

    const responseStock = apiData["stock/nuevo"] || {}

    const dispatch = useDispatch()

    const dispatchToast = (input) => dispatch(generarToast(input))

    useEffect(() => {
        if (Object.keys(responseStock).length == 0) return
        dispatchToast({ texto: `El lote #${responseStock.lote} se subio con exito`, tipo: "success" })
        dispatch(removerStock())
    }, [JSON.stringify(responseStock)])

    const subirStock = () => {

        if (stock.length == 0) {
            dispatchToast({ texto: "No puedes subir un stock vacio", tipo: "warning" })
        }
        else {
            dispatch(changeInicializado())
            generatePromise({ promesas: [{ method: "POST", url: "stock/nuevo", data: { listaDeNuevoStock: stock }, id: "stock/nuevo" }] })
        }
    }

    return (
        <>
            {
                loader ? <SpinnerLoader
                    position="y"
                    size="md" /> :
                    <Nav.Item
                        onClick={subirStock}
                        className="cursor-pointer hover-rosa  transition p-1 justify-content-center  d-flex align-items-center">
                        <p className="m-0 fw-normal fs-5 mx-1">Subir</p>
                        <i className="fa-solid fs-4 fa-cloud-arrow-up"></i>
                    </Nav.Item>
            }
        </>

    )
}))

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

                        <NuevoItem />

                        <Nav.Item>
                            <DropDownFilterCategoria />
                        </Nav.Item>

                        <SubirNuevoStockItem />

                    </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default NavDeNuevoStockContainer
