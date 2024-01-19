import { Col, Container, Row } from "react-bootstrap";
import { lazy, useState } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components/SuspenseLoadingComponent";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { NavBarSecciones } from "./NavbarSecciones";
import CardDeProductos from "./CardDeProductos";

const retrasar = (impor, seconds = 0) => {

    return new Promise((res,) => {
        setTimeout(() => {
            res(impor)
        }, 1000 * seconds);
    })
}

const helados = [
    { id: 1, nombre: 'Chocolate', cantidad: Math.floor(Math.random() * 10) + 1 },
    { id: 2, nombre: 'Frutilla', cantidad: Math.floor(Math.random() * 10) + 1 },
    { id: 3, nombre: 'Vainilla', cantidad: Math.floor(Math.random() * 10) + 1 },
    { id: 4, nombre: 'Banana split', cantidad: Math.floor(Math.random() * 10) + 1 },
    { id: 5, nombre: 'Dulce de leche', cantidad: Math.floor(Math.random() * 10) + 1 },
];

const InterfazDeRetiroDeProducto = lazy(() => retrasar(import("./InterfazDeRetiroDeProducto")))


const ContenedorDeStock = () => {
    const { alternarMostrar, mostrar } = useAlternarComponentes()
    const { insertarParametros, parametros } = useEstablecerParametros()
    const [contador, setContador] = useState({})

    return (
        <Container fluid className="p-0  m-0">
            <Row className="m-0">
                <NavBarSecciones />
            </Row>
            <Row className="m-0">
                <Col
                    className=" m-0 p-0 d-flex scrollbar align-content-start  h-100 flex-wrap  justify-content-center ">
                    {
                        helados.map((item) =>
                            <CardDeProductos
                                key={item.id}
                                insertarParametros={insertarParametros}
                                alternarMostrar={alternarMostrar}
                                contador={contador[item.nombre]}
                                objecto={item}
                            />
                        )
                    }

                    <SuspenseLoadingComponent texto="Cargando item">
                        {mostrar && <InterfazDeRetiroDeProducto
                            contador={contador}
                            setContador={setContador}
                            parametros={parametros}
                            alternarMostrar={alternarMostrar}
                            mostrar={mostrar} />}
                    </SuspenseLoadingComponent>
                </Col>
            </Row>
        </Container>

    );
};

export default ContenedorDeStock