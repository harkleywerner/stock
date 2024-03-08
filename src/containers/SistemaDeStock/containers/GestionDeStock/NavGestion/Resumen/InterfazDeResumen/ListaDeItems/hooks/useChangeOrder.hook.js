import { useCallback, useState } from "react";

export const useChangeOrder = () => {

    const [order, setOrder] = useState(true) //=> False asc, true desc

    const onChangeOrder = useCallback((valor) => {
        setOrder(valor)
    }, [])

    const orderByListaDeCambios  = (listadoDeCambios) => {
        return [...listadoDeCambios].sort((a, b) => {
            if (!order) {
                return a.hora_de_cambios - b.hora_de_cambios
            } else {
                return b.hora_de_cambios - a.hora_de_cambios
            }
        })
    }

    return {
        onChangeOrder,
        order,
        orderByListaDeCambios
    }

};