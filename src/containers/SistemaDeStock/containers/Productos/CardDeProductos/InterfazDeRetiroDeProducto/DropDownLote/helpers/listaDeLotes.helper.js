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


        const promesa = {
            method: "post", url: "stock/detalleDeStock/producto", id: "detalleDeStock",
            data: { id_producto, id_stock },
            cancelToken: cancelToken.token,
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

            setCantidadActual(prev => {

                return {
                    ...prev,
                    ...loteSeleccionado,
                    ...(data[0] || {})
                }
            })
        }
    }, [data])

};