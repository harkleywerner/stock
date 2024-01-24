import { Col, Container, Row } from "react-bootstrap";
import { lazy, useState } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components/SuspenseLoadingComponent";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { NavBarSecciones } from "./NavbarSecciones";
import CardDeProductos from "./CardDeProductos";

const helados = [
    {
        id: 1, nombre: 'Chocolate', cantidad_total: 1, devoluciones_permitidas: -7
    },
];

const InterfazDeRetiroDeProducto = lazy(() => import("./InterfazDeRetiroDeProducto"))

const ListaDeProductos = () => {



    const [listaDeRetirados, setListaDeRetirados] = useState({})

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { insertarParametros, parametros } = useEstablecerParametros()

    return (
        <Col
            className=" m-0 p-0 d-flex scrollbar align-content-start  h-100 flex-wrap  justify-content-center ">
            {
                helados.map((item) =>
                    <CardDeProductos
                        key={item.id}
                        insertarParametros={insertarParametros}
                        alternarMostrar={alternarMostrar}
                        listaDeRetirados={listaDeRetirados[item.nombre]}
                        item={item}
                    />
                )
            }

            <SuspenseLoadingComponent texto="Cargando item">
                {mostrar && <InterfazDeRetiroDeProducto
                    listaDeRetirados={listaDeRetirados}
                    setListaDeRetirados={setListaDeRetirados}
                    parametros={parametros}
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar} />}
            </SuspenseLoadingComponent>
        </Col>
    )
}

const ContenedorDeProductos = () => {


    return (
        <Container fluid className="p-0  m-0">
            <Row className="m-0">
                <NavBarSecciones />
            </Row>
            <Row className="m-0">
                <ListaDeProductos />
            </Row>
        </Container>

    );
};

export default ContenedorDeProductos