import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"
import { memo, useRef } from "react"
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
}) => {

    const refListado = useRef(null)

    const { data = [], tipo } = apiData["productos"] || {}

    const apiCall = scrollBusquedaHelper({ buscador, categoria, data, generatePromise, removerApiData })

    const spinner = (<SpinnerLoader color="dark" position="centered" size="md" />)

    return (
        <div
            style={{ minHeight: "200px", top: "100%", border: "1px solid #57BDC67F" }}
            className="position-absolute z-1 d-flex  w-100 mt-1  rounded-4 overflow-hidden  h-100  bg-white shadow" >

            {
                data.length == 0 ?
                    !loader && tipo == "success" ? <Message /> : spinner :

                    <ScrollingInfinite
                        dataLength={data.length}
                        ref={refListado}
                        step={15}
                        loaderComponent={spinner}
                        ApiCall={apiCall}>
                        <section
                            ref={refListado}
                            className="m-0  p-0 d-block w-100 scrollbar  justify-content-start ">
                            {
                                data.map(item =>
                                    <ItemsBusqueda
                                        alternarMostrar={alternarMostrar}
                                        insertarParametros={insertarParametros}
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
