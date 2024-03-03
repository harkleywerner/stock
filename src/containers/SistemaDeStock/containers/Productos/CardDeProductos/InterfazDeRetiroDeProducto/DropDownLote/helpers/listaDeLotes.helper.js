import axios from "axios";
import { useEffect } from "react";

export const listaDeLotesHelper = ({
    loteSeleccionado,
    generatePromise,
    setCantidadActual,
    id_stock,
    data,
    id_producto
}) => {

    const cancelToken = axios.CancelToken.source()

    useEffect(() => {

        if (Object.keys(loteSeleccionado).length == 0) return

        const promesa = {
            method: "post", url: "stock/detalleDeStock/producto", id: "detalleDeStock",
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
            setCantidadActual({ cantidad_total, devoluciones_permitidas, ...loteSeleccionado })
        }
    }, [data])

};