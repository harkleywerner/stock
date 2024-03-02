import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"
import axios from "axios"
import { memo, useCallback, useContext, useState } from "react"
import { useEffect } from "react"
import ProductoContext from "../context/Producto.context"

const Items = memo(({
    lote,
    loader,
    cantidadBackUp,
    loteActual,
    id_stock,
    selectLote,
    setCantidadActual
}) => {

    const onClick = () => {

        if (loteActual) {
            setCantidadActual(cantidadBackUp.current)
            selectLote({})
        } else {
            selectLote({ lote, id_stock })
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

    const [loteSeleccionado, setLoteSeleecionado] = useState({})

    const { lote, id_stock } = loteSeleccionado

    const { detalleDeStock = {} } = apiData

    const { data = [] } = detalleDeStock

    const cancelToken = axios.CancelToken.source()

    const selectLote = useCallback((numero) => {
        setLoteSeleecionado(numero)
    }, [])

    useEffect(() => {

        if (Object.keys(loteSeleccionado).length == 0) return

        const promesa = {
            method: "post", url: "detalleDeStock/producto", id: "detalleDeStock",
            data: { id_producto, id_stock },
            cancelToken: cancelToken.token
        }
        generatePromise({ promesa })

        return () => {
            if (cancelToken) {
                cancelToken.cancel()
            }
        }

    }, [JSON.stringify(loteSeleccionado)])

    useEffect(() => {

        if (data.length > 0) {
            const { cantidad_total, devoluciones_permitidas } = data[0]
            setCantidadActual({ cantidad_total, devoluciones_permitidas, lote: loteSeleccionado.lote })
        }
    }, [data])


    const sortBy = (array) => {
        return array.sort((a, b) => {
            if (a.lote == loteActual) return -1
        })
    }

    return (
        <>
            {
                sortBy([...lista]).map(item => <Items
                    selectLote={selectLote}
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