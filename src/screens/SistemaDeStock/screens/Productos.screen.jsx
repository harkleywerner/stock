

import NavProductosContainer from "@/containers//SistemaDeStock/containers/Productos/NavProductos.container";
import ProductosContainer from "@/containers//SistemaDeStock/containers/Productos/Productos.container";
import { Container, Row } from "react-bootstrap";

const ProductosScreen = () => {
    return (
        <Container fluid className="p-0 h-100 scrollbar d-flex flex-column  m-0">

            <Row className="m-0 flex-grow-0">
                <NavProductosContainer />
            </Row>

            <Row className="m-0 h-100  flex-grow-1  ">
                <ProductosContainer />
            </Row>
        </Container>
    );
};

export default ProductosScreen