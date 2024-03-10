import { useEffect } from "react";

export const listaDeLotesHelper = ({
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
            method: "post", url: "stock/detalleDeStock/producto", id: "detalleDeStock",
            data: { id_producto, id_stock },
        }
        generatePromise({ promesa })

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
