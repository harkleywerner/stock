import { memo } from "react";
import TablaDeItems from "./TablaDeItems";
import Paginacion from "@/components//Paginacion";
import { useFiltrosPorPagina } from "@/hooks//useFiltrosPorPagina";
import { Col } from "react-bootstrap";

const MensajeDeContenedorVacio = () => {

    return (
            <p className="text-white fw-normal fs-2 h-100  d-flex justify-content-center align-items-center">
                No se encontraron items

                <span className="font">...</span>
            </p>
    )
}

const ContenedorDeTabla = memo(({ state = [], removerItem }) => {


    const { establecerPaginacion, filtradoPorPage, page } = useFiltrosPorPagina()

    const nuevoEstado = filtradoPorPage(state)

    return (
        <Col className="d-flex flex-column justify-content-between   h-100  align-items-center w-100">
            {
                nuevoEstado.length == 0 ?
                    <MensajeDeContenedorVacio />
                    :
                    <TablaDeItems
                        state={nuevoEstado}
                        removerItem={removerItem} />
            }
            <Paginacion
                largo={nuevoEstado.length}
                establecerPaginacion={establecerPaginacion}
                page={page} />
        </Col>
    );
})

export default ContenedorDeTabla
