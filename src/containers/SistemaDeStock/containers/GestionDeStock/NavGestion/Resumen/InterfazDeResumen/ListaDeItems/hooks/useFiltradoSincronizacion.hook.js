import { useCallback, useState } from "react";

export const useFiltradoSincronizacion = () => {
    const [sincronizacion, setSincronizacion] = useState()

    const onHandleSincronizacion = useCallback((sincronizacion) => {
        setSincronizacion(prev => prev == sincronizacion ? "" : sincronizacion)
    }, [])

    const filterByListaDeCambios = (listadoDeCambios) => {
        if (!sincronizacion) return listadoDeCambios
        else {
           return listadoDeCambios.filter(item => item.sincronizacion == sincronizacion)
        }
    }

    return {
        onHandleSincronizacion,
        sincronizacion,
        filterByListaDeCambios
    }
};