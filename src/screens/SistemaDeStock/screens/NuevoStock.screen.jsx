

import NavDeNuevoStockContainer from "@/containers//SistemaDeStock/containers/NuevoStock/NavNuevoStock/NavNuevoStock.container";
import NuevoStockContainer from "@/containers//SistemaDeStock/containers/NuevoStock/NuevoStock.container";
import { Container, Row } from "react-bootstrap";

const NuevoStockScreen = () => {

    return (
        <Container fluid className="p-0 overflow-hidden  d-flex flex-column  h-100">

            <Row className="m-0 flex-grow-0">
                <NavDeNuevoStockContainer />
            </Row>
            <Row as  = "main" className="m-0 flex-grow-1 overflow-hidden  h-100 ">
                <NuevoStockContainer />
            </Row>
        </Container>
    );

};


export default NuevoStockScreen