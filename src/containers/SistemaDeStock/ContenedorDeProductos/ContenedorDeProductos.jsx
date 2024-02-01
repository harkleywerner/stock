import { Col, Container, Row } from "react-bootstrap";
import { lazy, useState } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components/SuspenseLoadingComponent";
import { NavBarSecciones } from "./NavbarSecciones";
import CardDeProductos from "./CardDeProductos";
import { Await, useLoaderData } from "react-router-dom";
import ErrorAwaitHandler from "@/components//ErrorAwaitHandler";



const InterfazDeRetiroDeProducto = lazy(() => import("./InterfazDeRetiroDeProducto"))

const ContenedorCard = ({ item }) => {

    const [listaDeRetirados, setListaDeRetirados] = useState({})

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    return (
        <>
            <CardDeProductos
                alternarMostrar={alternarMostrar}
                listaDeRetirados={listaDeRetirados[item.nombre]}
                item={item}
            />


            <SuspenseLoadingComponent texto={`Cargando item ${item.nombre}`}>
                {mostrar && <InterfazDeRetiroDeProducto
                    listaDeRetirados={listaDeRetirados}
                    setListaDeRetirados={setListaDeRetirados}
                    alternarMostrar={alternarMostrar}
                    parametros={item}
                    mostrar={mostrar} />}
            </SuspenseLoadingComponent>

        </>


    )
}


const ContenedorDeProductos = () => {

    const { productos } = useLoaderData()


    return (
        <SuspenseLoadingComponent texto="Cargando productos...">

            <Container fluid className="p-0  m-0">

                <Row className="m-0">
                    <NavBarSecciones />
                </Row>

                <Row className="m-0">

                    <Col
                        className=" m-0 p-0 d-flex scrollbar align-content-start  h-100 flex-wrap  justify-content-center ">
                        <Await errorElement={<ErrorAwaitHandler />} resolve={productos}>
                            {(resolveProductos) => resolveProductos.data.map(item => <ContenedorCard key={item.id_producto} item={item} />)}
                        </Await>
                    </Col>

                </Row>
            </Container>

        </SuspenseLoadingComponent >
    );
};

export default ContenedorDeProductos