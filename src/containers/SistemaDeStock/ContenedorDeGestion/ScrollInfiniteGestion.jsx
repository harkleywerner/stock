import { wrapperNotificacionesFetch } from "@/provider//NotificacionesProvider/wrapperNotificacionesFetch"
import axios from "axios"
import { useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import ScrollingInfinite from "../Components/ScrollingInfinite"
import { TablaGestion } from "./TablaGestion"

export const ScrollInfiniteGestion = wrapperNotificacionesFetch(({ data, loader, obtenerDatos, removerData }) => {


    const elementToObserver = useRef(null)

    const cancelSoruce = axios.CancelToken.source()

    const [search] = useSearchParams()

    const getBuscador = search.get("search")
    const getCategoria = search.get("categoria")

 
    const stock = data["detalleStock"] || []


    useEffect(() => {

        if (stock.length >= 0) {
            removerData({ id: "detalleStock" })

        }

        const timeOut = setTimeout(() => {
            obtenerDatos({ promesas: [listaDePromesas[0]] })
        }, 600);

        return () => {
            clearTimeout(timeOut)
            cancelSoruce.cancel()
        }

    }, [getBuscador, getCategoria])


    const nuevoPromesa = [{ ...listaDePromesas[0], params: { ...listaDePromesas[0].params, offset: stock.length } }]

    return (

        <ScrollingInfinite
            dataLength={stock.length}
            step={15}
            loader={{ loaderStatus: loader }}
            ref={elementToObserver}
            ApiCall={() => obtenerDatos({ promesa: nuevoPromesa })}
        >
            <section className="d-flex justify-content-center h-100">
                <TablaGestion ref={elementToObserver} stock = {stock} />
            </section>
        </ScrollingInfinite>
    );
})

