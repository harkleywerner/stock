import { Col, Container, Row } from "react-bootstrap";
import { lazy, memo, useEffect, useRef, useState } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components/SuspenseLoadingComponent";
import { NavBarSecciones } from "./NavbarSecciones";
import CardDeProductos from "./CardDeProductos";
import { useSearchParams } from "react-router-dom";
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";
import { usePromiseHandler } from "@/hooks//usePromiseHandler";
import axios from "axios";
import ScrollingInfinite from "@/containers//SistemaDeStock/Components/ScrollingInfinite";


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

    const elementToObserve = useRef(null)

    const getBuscador = search.get("search") || ""

    const getCategoria = search.get("categoria")

    const cancelSoruce = axios.CancelToken.source()

    const listaDePromesas = [
        {
            method: "GET", url: `/productos`, id: "productos",
            params: { search: getBuscador, categoria: getCategoria, offset: 0 },
            cancelToken: cancelSoruce.token
        }
    ]

    const dependencias = [getBuscador, getCategoria]

    const { loader, data, obtenerDatos, removerData } = usePromiseHandler({ establecerAlerta, dependecias: dependencias })

    const productos = data["productos"] || []


    useEffect(() => {

        if (productos.length >= 0) {
            removerData({ id: "productos" })
        }

        const timeOut = setTimeout(() => {

            obtenerDatos({ promesa: [listaDePromesas[0]] })

        }, 600);

        return () => {
            clearTimeout(timeOut)
            cancelSoruce.cancel()
        }

    }, dependencias)

    const nuevoPromesa = [{ ...listaDePromesas[0], params: { ...listaDePromesas[0].params, offset: productos.length } }]

    return (
        <ScrollingInfinite
            ApiCall={() => obtenerDatos({ promesa: nuevoPromesa })}
            dataLength={productos.length}
            elementToObserve={elementToObserve}
            step={15}
            loader={{ loaderStatus: loader, color: "white", size: "lg" }}>
            <section className="justify-content-center h-100 px-1 align-content-start align-items-center  flex-wrap  d-flex"
                ref={elementToObserve}>
                {
                    productos.length == 0 && getBuscador.length > 0 && loader ?
                        <p style={{ top: "0%" }} className="text-white position-absolute  text-center h-100 d-flex align-items-center   fs-5">No se encontro ningun producto con el nombre "{getBuscador}"...</p>
                        : productos.map(item => <ListadoDeCards key={Math.random() * 403403043} item={item} />)
                }
            </section>
        </ScrollingInfinite>
    )
}))




const ContenedorDeProductos = () => {

    return (

        <Container fluid className="p-0 h-100 overflow-hidden d-flex flex-column  m-0">

            <Row className="m-0 flex-grow-0">
                <NavBarSecciones />
            </Row>

            <Row className="m-0 h-100 flex-grow-1 overflow-hidden ">
                <ContenedorCard />
            </Row>
        </Container>
    )
}

export default ContenedorDeProductos
