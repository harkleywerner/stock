import { Container, Row } from "react-bootstrap";
import { NavHeader } from "../containers/SistemaDeStock/NavHeader/NavHeader";
import { Outlet, useLocation } from "react-router-dom";
import { lazy } from "react";
import { NuevoStockProvider } from "../provider/NuevoStockProvider";

const ContenedorDeStock = lazy(() => import("../containers/SistemaDeStock/ContenedorDeStock/ContenedorDeStock"))

const SistemaDeStock = () => {

    const { pathname } = useLocation()

    const splitPath = pathname.split("/").filter(i => i.length !== 0)


    return (
        <NuevoStockProvider>
            <Container fluid className='p-0 overflow-hidden d-flex flex-column vh-100'>

                <Row id="nav" className='m-0 '>
                    <NavHeader />
                </Row>
                <Row
                    as={"main"}
                    className='h-100 m-0 flex-grow-1 overflow-hidden'>
                    {
                        splitPath.length == 1 ? <ContenedorDeStock /> : <Outlet />
                    }
                </Row>
            </Container >
        </NuevoStockProvider>
    );
};

export default SistemaDeStock