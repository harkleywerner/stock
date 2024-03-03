import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"
import { memo, useCallback, useContext, useState } from "react"
import ProductoContext from "../context/Producto.context"
import { listaDeLotesHelper } from "./helpers/listaDeLotes.helper"

const Items = memo(({
    lote,
    loader,
    cantidadBackUp,
    loteActual,
    id_stock,
    establecerLote,
    setCantidadActual
}) => {

    const onClick = () => {

        if (loteActual) {
            setCantidadActual(cantidadBackUp.current)
            establecerLote({})
        } else {
            establecerLote({ lote, id_stock })
        }
    }

    return (
        <li
            onClick={onClick}
            className="dropdown-item bg-white position-relative transition  bg-hoverdark text-center border-bottom">
            {
                loader ? <SpinnerLoader
                    size="sm"
                    position="centered"
                    color="dark" /> :
                    <span>
                        #{lote}
                        {
                            loteActual && <i
                                style={{ right: "20px" }}
                                className=" position-absolute fa-solid fa-check fs-5 text-success" />
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

    const { cantidadBackUp, setCantidadActual, loteActual } = useContext(ProductoContext)

    const [loteSeleccionado, setLote] = useState({})

    const { lote, id_stock } = loteSeleccionado

    const { detalleDeStock = {} } = apiData

    const { data = [] } = detalleDeStock

    const establecerLote = useCallback((numero) => setLote(numero), [])

    listaDeLotesHelper({ generatePromise, loteSeleccionado, setCantidadActual, data, id_stock, id_producto })

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
                    cantidadBackUp={cantidadBackUp}
                    key={item.id_stock}
                    {...item} />)
            }
        </>
    )
}

export default wrapperNotificacionesServidor(memo(ListaDeLotes))