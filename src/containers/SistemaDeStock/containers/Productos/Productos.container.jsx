import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"
import { memo, useRef } from "react"
import { Col } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import ScrollingInfinite from "../Components/ScrollingInfinite"
import CardDeProductos from "./CardDeProductos/CardDeProductos"
import { scrollProductosHelper } from "./hooks/scrollProductos.helper"

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

    const { data = [], tipo } = apiData["productos"] || {}
    
    const [search] = useSearchParams()

    const getBuscador = search.get("search") || ""

    const getCategoria = search.get("categoria")
    
    const apiCall = scrollProductosHelper({
        dataLength : data.length,
        generatePromise,
        getBuscador,
        getCategoria,
        removerApiData
    })


    const elementToObserve = useRef(null)


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