import { Container, Row } from "react-bootstrap";
import { NavDeGestion } from "./NavDeGestion";
import ContenedorDeTabla from "@/components//ContenedorDeTabla/ContenedorDeTabla";
import { useFiltrosParams } from "@/hooks//useFiltrosParams";
import { nuevoStockContext } from "@/provider//NuevoStockProvider";
import { useContext } from "react";

export const UltimaTabla = () => {

    const props = useContext(nuevoStockContext)["ultimaTabla"]

    const filtros = useFiltrosParams(props.state)

    return (
        <ContenedorDeTabla {...props} state={filtros} />
    );
};




const ContenedorDeGestion = () => {

    return (
        <Container fluid className="p-0 overflow-hidden  d-flex flex-column  h-100">

            <Row className="m-0 flex-grow-0">
                <NavDeGestion />
            </Row>
            <Row className="m-0 flex-grow-1 overflow-hidden  h-100 ">
                <UltimaTabla />
            </Row>
        </Container>
    );
};

export default ContenedorDeGestion