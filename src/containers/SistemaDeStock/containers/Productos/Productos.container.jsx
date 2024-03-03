import SpinnerLoader from "@/components//SpinnerLoader"
import axios from "axios"
import { memo, useEffect, useRef } from "react"
import { Col } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import ScrollingInfinite from "../Components/ScrollingInfinite"
import CardDeProductos from "./CardDeProductos/CardDeProductos"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"

const Message = memo(({ getBuscador }) => {
    return (
        <p className="text-white w-100   text-center h-100 d-flex align-items-center  justify-content-center text-center fs-5">No se encontro ningun producto con el nombre "{getBuscador}"...</p>
    )
})

const ProductosContainer = memo(({
    loader,
    apiData,
    generatePromise,
    removerApiData
}) => {

    const [search] = useSearchParams()

    const elementToObserve = useRef(null)

    const getBuscador = search.get("search") || ""

    const getCategoria = search.get("categoria")

    const cancelSource = axios.CancelToken.source()

    const { data = [], tipo } = apiData["productos"] || {}

    const apiCall = (reset) => {

        const promesa =
        {
            method: "GET", url: `/stock/productos`, id: "productos",
            params: { search: getBuscador, categoria: getCategoria, offset: reset ?? data.length },
            cancelToken: cancelSource.token,
            concatenate: true
        }

        generatePromise({ promesa: promesa })
    }

    useEffect(() => {

        removerApiData({ id: "productos" })

        const timeOut = setTimeout(() => {

            apiCall(0)

        }, 600);

        return () => {
            clearTimeout(timeOut)
            cancelSource.cancel()
        }

    }, [getBuscador, getCategoria])


    return (
        <Col className="p-0 h-100 d-flex">
            {
                data.length == 0 ?
                    tipo == "success" && !loader ? <Message getBuscador={getBuscador} /> : <SpinnerLoader position="centered" />

                    :
                    <ScrollingInfinite
                        ApiCall={apiCall}
                        dataLength={data.length}
                        ref={elementToObserve}
                        step={15}>
                        <section
                            className="justify-content-center px-1 align-content-start align-items-center flex-wrap d-flex"
                            ref={elementToObserve}>
                            {
                                data.map(item => <CardDeProductos key={item.id_producto} item={item} />)
                            }
                        </section>
                    </ScrollingInfinite>
            }
        </Col>
    )
})

export default wrapperNotificacionesServidor(ProductosContainer)