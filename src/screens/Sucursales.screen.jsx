import { Container, Row } from "react-bootstrap";
import { SucursalesContainer } from "../containers/Sucursales/Sucursales.container";


const SucursalesScreen = () => {

    return (
        <Container fluid className=" vh-100 overflow-hidden p-0">
            <Row className="m-0 h-100">
                <SucursalesContainer />
            </Row>
        </Container>
    );
}

export default SucursalesScreen