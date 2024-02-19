import GestionStockContainer from "@/containers//SistemaDeStock/containers/GestionDeStock/GestionStock.container";
import GestionStockLoader from "@/containers//SistemaDeStock/containers/GestionDeStock/GestionStock.loader";
import NavDeGestionContainer from "@/containers//SistemaDeStock/containers/GestionDeStock/NavGestion/NavGestion.container";
import { Container, Row } from "react-bootstrap";

const GestionStockScreen = () => {
    return (
        <Container fluid className="p-0 overflow-hidden  d-flex flex-column  h-100">
            <GestionStockLoader>
                <Row className="m-0 flex-grow-0">
                    <NavDeGestionContainer />
                </Row>
                <Row as = "main" className="m-0 flex-grow-1 overflow-hidden  h-100 ">
                    <GestionStockContainer />
                </Row>
            </GestionStockLoader>
        </Container>
    );
}

export default GestionStockScreen