import { Col, Container, Row } from "react-bootstrap";
import { CardDeSucursales } from "../containers/Sucursales/CardDeSucursales";
import { useAlternarComponentes } from "../hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "../components/SuspenseLoadingComponent";
import { lazy } from "react";
import { Await, useLoaderData } from "react-router-dom";

const InterfazDeLogeo = lazy(() => import("../containers/Sucursales/InterfazDeLogeo"))

const ContenedorCard = ({ nombre, id_sucursal }) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    return (
        <>
            <CardDeSucursales
                alternarMostrar={alternarMostrar}
                nombre={nombre}
            />
            <SuspenseLoadingComponent texto={`Cargando ${nombre}`}>
                {
                    mostrar &&
                    <InterfazDeLogeo
                        alternarMostrar={alternarMostrar}
                        mostrar={mostrar}
                        nombre={nombre}
                        id_sucursal={id_sucursal} />
                }
            </SuspenseLoadingComponent>
        </>
    )
}


const Sucursales = () => {

    const { lista_de_sucursales } = useLoaderData()

    return (
        <SuspenseLoadingComponent texto="Cargando sucursales">
            <Container fluid className=" vh-100 overflow-hidden p-0">
                <Row className="m-0 h-100">
                    <Col className="p-0 h-100 scrollbar flex-wrap d-flex align-content-start align-items-center justify-content-center">
                        <Await resolve={lista_de_sucursales}>
                            {(resolveSucursal) => (
                                resolveSucursal.data.map(item => <ContenedorCard key={item.id_sucursal} {...item} />)
                            )}
                        </Await>
                    </Col>
                </Row>
            </Container>
        </SuspenseLoadingComponent>
    );
};

export default Sucursales