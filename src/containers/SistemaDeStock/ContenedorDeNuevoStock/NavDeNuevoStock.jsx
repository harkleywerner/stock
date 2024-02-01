import { DropDownFilterCategoria } from "@/components//DropDownFilterCategoria";
import { DropDownSucursal } from "@/components//DropDownSucursal";
import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import wrapperAlerta from "@/provider//NotificacionesProvider/wrapperNotificaciones";
import { gestionDeStockContext } from "@/provider//GestionDeStockProvider";
import { lazy, useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const InterfazDeNuevoItem = lazy(() => import("../Components/InterfazDeNuevoItem/InterfazDeNuevoItem"))

const InterfazContext = ({ alternarMostrar, mostrar }) => {

    const { agregarItem, editarItem, state } = useContext(gestionDeStockContext)["nuevaTabla"]

    return (
        <SuspenseLoadingComponent texto="Cargando interfaz">
            {
                mostrar &&
                <InterfazDeNuevoItem
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar}
                    agregarItem={agregarItem}
                    editarItem={editarItem}
                    state={state}
                />
            }
        </SuspenseLoadingComponent>
    )
}

const NuevoItem = () => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    return (
        <>
            <Nav.Item
                onClick={alternarMostrar}
                className="cursor-pointer hover-rosa fs-3 transition p-1 justify-content-center  d-flex align-items-center" >
                <p className="m-0  fw-normal fs-5 mx-1">Agregar item</p>
                <i className="fa-regular  fs-4 fa-square-plus"></i>
            </Nav.Item>
            <InterfazContext
                alternarMostrar={alternarMostrar}
                mostrar={mostrar} />
        </>
    )
}

const SubirNuevoStockItem = wrapperAlerta(({ establercerAlerta }) => {

    const { state } = useContext(gestionDeStockContext)["nuevaTabla"]

    const subirStock = async () => {

        if (state.length == 0) {
            establercerAlerta({ texto: "No puedes subir un stock vacio", tipo: "warning", id: "warning-subirstock-1" })
        }
        else {
            establercerAlerta({ texto: "El stock  403 se subio con exito", tipo: "success", id: "succes-subirstock-1" })
        }

    }

    return (
        <Nav.Item
            onClick={subirStock}
            className="cursor-pointer hover-rosa  transition p-1 justify-content-center  d-flex align-items-center">
            <p className="m-0 fw-normal fs-5 mx-1">Subir</p>
            <i className="fa-solid fs-4 fa-cloud-arrow-up"></i>
        </Nav.Item>
    )
})


export const NavDeNuevoStock = () => {

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

                        <NavLink
                            className="text-decoration-none text-white cursor-pointer hover-rosa fs-3 transition p-1 justify-content-center  d-flex align-items-center"
                            to={"/stock/gestion"}>
                            <p className="m-0  fw-normal fs-5 mx-1">Editar ultimo stock</p>
                            <i className="fa-solid fs-4 fa-wand-magic-sparkles"></i>
                        </NavLink>

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