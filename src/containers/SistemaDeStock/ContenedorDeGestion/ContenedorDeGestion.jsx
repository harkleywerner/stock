import { Container, Row } from "react-bootstrap";
import { NavDeGestion } from "./NavDeGestion";
import { TablaGestion } from "./TablaGestion";
import { wrapperNotificacionesFetch } from "@/provider//NotificacionesProvider/wrapperNotificacionesFetch";
import { memo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


const Tabla = wrapperNotificacionesFetch(memo(({ data, loader, obtenerDatos, removerData }) => {

    const [search] = useSearchParams()

    const getStock = search.get("stock")

    const verificarStock = getStock ? "/detalleDeStock" : "/detalleDeStock/ultimo"

    const stock = data["detalleStock"] || []

    const listaDePromesas = [
        {
            method: "GET", url: verificarStock, id: "detalleStock",
        }
    ]

    useEffect(() => {
        obtenerDatos({ promesas: listaDePromesas })
    }, [])


    return (
        <TablaGestion stock={stock} />
    )
}))

const ContenedorDeGestion = () => {

    return (
        <Container fluid className="p-0 overflow-hidden  d-flex flex-column  h-100">

            <Row className="m-0 flex-grow-0">
                <NavDeGestion />
            </Row>
            <Row className="m-0 flex-grow-1 overflow-hidden  h-100 ">
                <Tabla />
            </Row>
        </Container>
    );
}

export default ContenedorDeGestion