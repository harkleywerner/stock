import { useEffect } from "react";

export const obtenerTranssacionHelper = ({
    loteSeleccionado,
    generatePromise,
    setCantidadActual,
    data,
    id_producto
}) => {

    useEffect(() => {

        if (Object.keys(data).length == 0) return

        setCantidadActual(prev => (
            {
                ...data,
                ...loteSeleccionado,
                copia: prev.copia
            }
        ))

    }, [data])

    return ({ id_stock }) => {

        const promesa = {
            method: "get", url: "stock/transsaciones", id: "transsaciones",
            params: { id_producto, id_stock },
        }
        generatePromise({ promesa })
    }


};
