import { Col, Container, Row } from "react-bootstrap";
import { lazy, memo, useEffect, useRef, useState } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components/SuspenseLoadingComponent";
import { NavBarSecciones } from "./NavbarSecciones";
import CardDeProductos from "./CardDeProductos";
import { useSearchParams } from "react-router-dom";
import SpinnerLoader from "@/components//SpinnerLoader";
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";
import { useLoaderPromesas } from "@/hooks//useLoaderPromesas";
import axios from "axios";
import { useScrolling } from "@/hooks//useScrolling";
import shortUUID from "short-uuid";

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

const ScrollingInfinito = ({ children, obtenerDatos, refScrolling, offset, step} = {}) => {



    useEffect(() => {
        const component = refScrolling.current

        const test = async (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;

            const scrollPercentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)

            if (scrollPercentage == 100 && offset % step == 0) {
                console.log(offset)
                await obtenerDatos()
            }
        }

        component.addEventListener("scroll", test)
        return () => component.removeEventListener("scroll", test)

    }, [offset])

    // useEffect(() => {
    //     SetScrollVault([...scrollVault, data])
    // }, [data])



    return (
        <>
        <div>
        {children}
        </div>
         
        </>
    )
}



const ContenedorCard = wrapperNotificaciones(memo(({ establecerAlerta }) => {

    const [search] = useSearchParams()

    const refScrolling = useRef()
    const getBuscador = search.get("search") || ""

    const getCategoria = search.get("categoria")

    const cancelSoruce = axios.CancelToken.source()

    const promesaInicial = {
        method: "GET", url: `/productos`, id: "productos",
        params: { search: getBuscador, categoria: getCategoria, offset: 0 },
        cancelToken: cancelSoruce.token
    }

    const { loader, data, obtenerDatos } = useLoaderPromesas({ promesaInicial, establecerAlerta })

    useEffect(() => {

        if (!loader && data.length == 0 && getBuscador.length == 0) return

        const timeOut = setTimeout(() => {

            obtenerDatos({ promesa: promesaInicial })

        }, 600);

        return () => {
            clearTimeout(timeOut)
            cancelSoruce.cancel()
        }

    }, [getBuscador, getCategoria])



    return (
        <ScrollingInfinito
            refScrolling={refScrolling}
            obtenerDatos={() => obtenerDatos({ promesa: { ...promesaInicial, offset: data.length } })}
            offset={data.length}
            step={15}
        >
            <Col
                ref={refScrolling}
                className=" m-0 p-0 d-flex scrollbar align-content-start flex-wrap h-25 align-items-center   justify-content-center ">

                {
                    !loader && data.length == 0
                        ? <SpinnerLoader /> :
                        data.length == 0 ?
                            <p className="text-white  h-100 d-flex align-items-center  fs-5">No se encontro ningun producto con el nombre "{getBuscador}"...</p>
                            : [...data, ...data].map(item => <ListadoDeCards key={shortUUID.generate()} item={item} />)
                }

            </Col>
        </ScrollingInfinito>
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