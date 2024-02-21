import StockContainer from "@/containers//SistemaDeStock/Stock/BodyStockContainer/BodyStock.container";
import NavStockContainer from "@/containers/SistemaDeStock/Stock/NavStockContainer/NavStock.container";
import { Container, Row } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";

const OuletContainer = () => {

    const { pathname } = useLocation()

    const split = pathname.split("/").filter(item => !item.length == 0)

    return (
        <>
            {
                split.length == 1 ? <StockContainer /> : <Outlet />
            }
        </>
    )
}

const StockScreen = () => {




    return (
        <Container
            style={{ maxHeight: "100vh" }}
            fluid
            className='p-0  d-flex flex-column vh-100'>

            <Row
                id="nav"
                className='m-0 flex-grow-0 '>
                <NavStockContainer />
            </Row>

            <Row
                as={"main"}
                className='h-100 scrollbar m-0  '>
                <OuletContainer />
            </Row>
        </Container >
    );
}

export default StockScreen