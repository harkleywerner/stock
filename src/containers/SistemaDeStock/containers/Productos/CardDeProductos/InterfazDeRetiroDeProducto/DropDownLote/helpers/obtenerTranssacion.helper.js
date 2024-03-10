import { useEffect } from "react";

export const obtenerTranssacionHelper = ({
    loteSeleccionado,
    generatePromise,
    setCantidadActual,
    id_stock,
    data,
    id_producto
}) => {


    useEffect(() => {

        if (!("id_stock" in loteSeleccionado)) return

        const promesa = {
            method: "get", url: "stock/transsaciones", id: "transsaciones",
            params: { id_producto, id_stock },
        }
        generatePromise({ promesa })

    }, [JSON.stringify(loteSeleccionado)])

    useEffect(() => {

        if (Object.keys(data).length > 0) {

            setCantidadActual(prev => {

                return {
                    ...prev,
                    ...loteSeleccionado,
                    ...data
                }
            })
        }
    }, [data])

};
