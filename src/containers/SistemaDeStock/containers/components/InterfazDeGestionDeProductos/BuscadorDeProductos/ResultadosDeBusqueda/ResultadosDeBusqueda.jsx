import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor"
import { memo, useCallback, useRef } from "react"
import ScrollingInfinite from "../../../ScrollingInfinite"
import { scrollBusquedaHelper } from "./helpers/scrollBusqueda.helper"
import ItemsBusqueda from "./ItemsBusqueda"

const Message = memo(() => {
    return (
        <p className="m-0  text-center d-flex justify-content-center align-items-center h-100 w-100 text-secondary text-center fs-5">
            No se encontro ningun item...
        </p>

    )
})

export const ResultadosDeBusqueda = wrapperNotificacionesServidor(memo(({
    buscador,
    insertarParametros,
    categoria,
    apiData,
    loader,
    alternarMostrar,
    generatePromise,
    removerApiData,
    stock,
    mostrar
}) => {

    const refListado = useRef(null)

    const { data = [], tipo } = apiData["productos"] || {}

    const listaDeIds = stock.map(i => i.id_producto)

    const apiCall = scrollBusquedaHelper({
        buscador,
        categoria,
        data,
        generatePromise,
        removerApiData,
        listaDeIds
    })

    const insertarParametroCb = useCallback((valor)=> insertarParametros(valor))


    const filtrado = data.filter(item => !listaDeIds.includes(item.id_producto))
    //Cuando no se ejecuta de nuevo la llamada, este filtro se encarga de filtrar en los elementos nuevos.

    const spinner = (<SpinnerLoader color="dark" position="centered" size="md" />)

    return (
        <div
            style={{ minHeight: "200px", top: "100%", border: "1px solid #57BDC67F", display: mostrar ? "flex" : "none" }}
            className="position-absolute z-1  w-100 mt-1  rounded-4 overflow-hidden  h-100  bg-white shadow" >

            {
                filtrado.length == 0 ?
                    !loader && tipo == "success" ? <Message /> : spinner :

                    <ScrollingInfinite
                        dataLength={filtrado.length}
                        ref={refListado}
                        step={15}
                        loaderComponent={spinner}
                        ApiCall={apiCall}>
                        <section
                            ref={refListado}
                            className="m-0  p-0 d-block w-100 scrollbar  justify-content-start ">
                            {
                                filtrado.map(item =>
                                    <ItemsBusqueda
                                        alternarMostrar={alternarMostrar}
                                        insertarParametros={insertarParametroCb}
                                        key={item.id_producto}
                                        item={item}
                                    />)
                            }
                        </section>
                    </ScrollingInfinite>
            }
        </div>
    )
}))
