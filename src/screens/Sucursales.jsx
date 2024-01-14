import { Col, Container, Row } from "react-bootstrap";
import { CardDeSucursales } from "../containers/Sucursales/CardDeSucursales";
import { useAlternarComponentes } from "../hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "../components/SuspenseLoadingComponent";
import { lazy } from "react";
import { useEstablecerParametros } from "../hooks/useEstablecerParametros";

const retrasar = (impor, seconds = 0) => {

    return new Promise((res, rej) => {
        setTimeout(() => {
            res(impor)
        }, 1000 * seconds);
    })
}


const InterfazDeLogeo = lazy(() => retrasar(import("../containers/Sucursales/InterfazDeLogeo")))

const listadoDeSucursales = [
    { id: 1, nombre: "25 de mayo 226" },
    { id: 2, nombre: "Salta 398" },
    { id: 3, nombre: "25 de mayo 226" },
    { id: 4, nombre: "25 de mayo 226" },
    { id: 5, nombre: "25 de mayo 226" },
    { id: 6, nombre: "25 de mayo 226" },
    { id: 7, nombre: "25 de mayo 226" },

]



export const Sucursales = () => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { insertarParametros, parametros } = useEstablecerParametros()

    return (
        <Container fluid className=" vh-100 overflow-hidden">
            <SuspenseLoadingComponent
                texto="Cargando sucursal">
                {
                    mostrar && <InterfazDeLogeo
                        alternarMostrar={alternarMostrar}
                        mostrar={mostrar}
                        parametros={parametros}
                    />
                }
            </SuspenseLoadingComponent>
            <Row className="m-0 h-100">
                <Col className="p-0 h-100 scrollbar flex-wrap d-flex align-content-start align-items-center justify-content-center">
                    {
                        listadoDeSucursales.map(item =>
                            <CardDeSucursales
                                insertarParametros={insertarParametros}
                                alternarMostrar={alternarMostrar}
                                key={item.id} objecto={item} />)
                    }
                </Col>
            </Row>


        </Container>
    );
};