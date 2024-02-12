
import { gestionDeStockContext } from "@/provider//GestionDeStockProvider/GestionDeStockProvider";
import { useContext } from "react";
import { Col } from "react-bootstrap";
import { useFiltrosParams } from "../hooks/useFiltroProductos";
import ContenedorDeTabla from "../components/ContenedorDeTabla/ContenedorDeTabla";

const NuevoStockContainer = () => {

    const props = useContext(gestionDeStockContext)["nuevaTabla"]

    const filtros = useFiltrosParams(props.state)

    return (
        <Col className="p-0 overflow-hidden h-100">
            <ContenedorDeTabla {...props} state={filtros} />
        </Col>
    );
};

export default NuevoStockContainer
