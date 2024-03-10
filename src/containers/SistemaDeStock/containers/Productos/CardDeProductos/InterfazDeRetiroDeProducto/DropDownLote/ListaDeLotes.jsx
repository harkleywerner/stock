import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor"
import { memo, useCallback, useContext, useState } from "react"
import ProductoContext from "../context/Producto.context"
import { obtenerTranssacionHelper } from "./helpers/obtenerTranssacion.helper"

const Items = memo(({
    lote,
    loader,
    loteActual,
    id_stock,
    establecerLote,
    setCantidadActual
}) => {

    const onClick = () => {

        if (loteActual) {
            establecerLote({}),
                setCantidadActual(prev => {
                    return {
                        ...prev.copia,
                        copia: prev.copia
                    }
                })
        } else {
            establecerLote({ lote, id_stock })
        }
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
                            loteActual && <i
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

    const { setCantidadActual, loteActual } = useContext(ProductoContext)

    const [loteSeleccionado, setLote] = useState({})

    const { lote, id_stock } = loteSeleccionado

    const { transsaciones  = {} } = apiData

    const { data = {} } = transsaciones

    const establecerLote = useCallback((numero) => setLote(numero), [])

    obtenerTranssacionHelper({ generatePromise, loteSeleccionado, setCantidadActual, data, id_stock, id_producto })


    const sortBy = (array) => {
        return array.sort((a) => {
            if (a.lote == loteActual) return -1
        })
    }

    return (
        <>
            {
                sortBy([...lista]).map(item => <Items
                    establecerLote={establecerLote}
                    loader={loader && item.lote == lote}
                    loteActual={loteActual == item.lote}
                    id_producto={id_producto}
                    setCantidadActual={setCantidadActual}
                    key={item.id_stock}
                    {...item} />)
            }
        </>
    )
}

export default wrapperNotificacionesServidor(memo(ListaDeLotes))