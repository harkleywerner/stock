import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavStockContainer from "@/containers/SistemaDeStock/Stock/NavStockContainer/NavStock.container";


const StockScreen = () => {

    return (
            <Container style={{ maxHeight: "100vh" }} fluid className='p-0  d-flex flex-column vh-100'>

                <Row id="nav" className='m-0 flex-grow-0 '>
                    <NavStockContainer />
                </Row>

                <Row
                    as={"main"}
                    className='h-100 m-0 flex-grow-1 overflow-hidden'>
                    <Outlet />
                </Row>
            </Container >
    );
}

export default StockScreen