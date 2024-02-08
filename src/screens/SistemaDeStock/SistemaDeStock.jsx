import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { GestionDeStockProvider } from "../../provider/GestionDeStockProvider/GestionDeStockProvider";
import { NavHeader } from "./NavHeader";


const SistemaDeStock = () => {

    return (
        <GestionDeStockProvider>
            <Container style={{ maxHeight: "100vh" }} fluid className='p-0  d-flex flex-column vh-100'>

                <Row id="nav" className='m-0 flex-grow-0 '>
                    <NavHeader />
                </Row>

                <Row
                    as={"main"}
                    className='h-100 m-0 flex-grow-1 overflow-hidden'>
                    <Outlet />
                </Row>
            </Container >
        </GestionDeStockProvider>
    );
}

export default SistemaDeStock