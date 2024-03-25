import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor"
import { memo, useCallback, useContext, useState } from "react"
import ProductoContext from "../context/Producto.context"
import { obtenerTranssacionHelper } from "./helpers/obtenerTranssacion.helper"

const Items = memo(({
    lote,
    loader,
    isLoteActual,
    id_stock,
    establecerLote,
}) => {

    const onClick = () => {

        const send = !isLoteActual ? { id_stock, lote } : null

        establecerLote(send)

    }

    return (
        <li
            onClick={onClick}
            style={{ backgroundColor: "#7CDAFD", borderBottom: "3px solid #0cb1eb" }}
            className="dropdown-item mt-1 w-75 transition mx-auto position-relative bg-hoverdark  rounded-3 text-center">
            {
                loader ? <SpinnerLoader
                    size="sm"
                    position="centered"
                    color="dark" /> :
                    <span
                        className="text-white rounded-3  py-1 "  >
                        <span style={{ color: "#0cb1eb" }}>#</span>
                        {lote}
                        {
                            isLoteActual && <i
                                style={{ right: "5px", color: "#0271a2", top: "5px" }}
                                className=" position-absolute  fa-solid fa-check fs-5" />
                        }
                    </span>
            }
        </li>
    )
})

const ListaDeLotes = ({
    data: lista,
    apiData,
    generatePromise,
    id_producto,
    loader,
}) => {

    const { setCantidadActual } = useContext(ProductoContext)

    const [loteSeleccionado, setLote] = useState({})

    const { lote } = loteSeleccionado

    const { transsaciones = {} } = apiData

    const { data = {} } = transsaciones


    const apiCall = obtenerTranssacionHelper({
        generatePromise,
        loteSeleccionado,
        setCantidadActual,
        data,
        id_producto
    })

    const onClick = useCallback((lote) => {

        if (!lote) {
            setLote({})
            setCantidadActual(prev => {
                return {
                    ...prev.copia,
                    copia: prev.copia
                }
            })
        } else {
            setLote(lote)
            apiCall(lote)
        }
    }, [])

    const sortLote = (array) => {
        return array.sort((a) => {
            if (a.lote == lote) return -1
        })
    }

    return (
        <>
            {
                sortLote([...lista])
                    .map(item =>
                        <Items
                            establecerLote={onClick}
                            loader={loader && item.lote == lote}
                            isLoteActual={lote == item.lote}
                            id_producto={id_producto}
                            key={item.id_stock}
                            {...item} />)
            }
        </>
    )
}

export default wrapperNotificacionesServidor(memo(ListaDeLotes))