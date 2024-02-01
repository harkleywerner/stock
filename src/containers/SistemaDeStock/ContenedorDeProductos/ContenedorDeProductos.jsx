import { Col, Container, Row } from "react-bootstrap";
import { lazy, memo, useEffect, useState } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components/SuspenseLoadingComponent";
import { NavBarSecciones } from "./NavbarSecciones";
import CardDeProductos from "./CardDeProductos";
import { useSearchParams } from "react-router-dom";
import SpinnerLoaderFetch from "@/components//SpinnerLoaderFetch";
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";
import { useLoaderPromesas } from "@/hooks//useLoaderPromesas";

const InterfazDeRetiroDeProducto = lazy(() => import("./InterfazDeRetiroDeProducto"))

const ListadoDeCards = ({ item }) => {

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


const ContenedorCard = wrapperNotificaciones(memo(({ establecerAlerta }) => {

    const [search] = useSearchParams()

    const listaDePromesas = [
        { method: "GET", url: `/productos/?${search.toString()}`, id: "productos" }
    ]

    const { loader, data, obtenerDatos } = useLoaderPromesas({ listaDePromesas, establecerAlerta })

    const productos = data.productos || []

    useEffect(() => {

        if (!loader) return

        obtenerDatos({ promesa: [listaDePromesas[0]] })

    }, [search.toString()])

    return (

        <Col className=" m-0 p-0 d-flex scrollbar align-content-start flex-wrap h-100 align-items-center  justify-content-center ">

            {
                !loader
                    ? <SpinnerLoaderFetch /> :
                    productos.length == 0 ? <p className="text-white  h-100 d-flex align-items-center  fs-5">No se encontraron productos...</p>
                        : productos.map(item => <ListadoDeCards key={item.id_producto} item={item} />)
            }

        </Col>

    )
}))


const ContenedorDeProductos = () => {


    return (

        <Container fluid className="p-0 h-100  m-0">

            <Row className="m-0">
                <NavBarSecciones />
            </Row>

            <Row className="m-0 h-100">
                <ContenedorCard />
            </Row>
        </Container>
    )
}

export default ContenedorDeProductos