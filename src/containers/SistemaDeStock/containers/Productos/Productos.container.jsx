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

const ProductosContainer = wrapperNotificacionesServidor(memo(({ loader, data, generatePromise, removerData }) => {

    const [search] = useSearchParams()

    const elementToObserve = useRef(null)

    const getBuscador = search.get("search") || ""

    const getCategoria = search.get("categoria")

    const cancelSoruce = axios.CancelToken.source()

    const promesa =
        {
            method: "GET", url: `/productos`, id: "productos",
            params: { search: getBuscador, categoria: getCategoria, offset: 0 },
            cancelToken: cancelSoruce.token,
            concatenate: true
        }

    const productos = data["productos"] || []

    useEffect(() => {

        if (productos.length >= 0) {
            removerData({ id: "productos" })
        }

        const timeOut = setTimeout(() => {

            generatePromise({ promesas: [promesa] })

        }, 600);

        return () => {
            clearTimeout(timeOut)
            cancelSoruce.cancel()
        }

    }, [getBuscador, getCategoria])

    const nuevoPromesa = [{ ...promesa, params: { ...promesa.params, offset: productos.length } }]

    return (
        <Col className="p-0 h-100 d-flex">
            {
                productos.length == 0 ?
                    getBuscador.length > 0 && !loader ? <Message getBuscador={getBuscador} /> : <SpinnerLoader position="centered" />

                    :
                    <ScrollingInfinite
                        ApiCall={() => generatePromise({ promesas: nuevoPromesa })}
                        dataLength={productos.length}
                        ref={elementToObserve}
                        step={15}>
                        <section
                            className="justify-content-center px-1 align-content-start align-items-center flex-wrap d-flex"
                            ref={elementToObserve}>
                            {
                                productos.map(item => <CardDeProductos key={item.id_producto} item={item} />)
                            }
                        </section>
                    </ScrollingInfinite>
            }
        </Col>
    )
}))

export default ProductosContainer