import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { lazy, memo, useCallback, useState } from "react";
import { envioCantidadHelper } from "./helpers/envioCantidad.helper";
import { CardProducto } from "./CardProducto";

const InterfazDeRetiroDeProducto = lazy(() => import("./InterfazDeRetiroDeProducto/InterfazDeRetiroDeProducto"))


const CardProductoContainer = ({
    item,
    generatePromise,
    loader,
    apiData
}) => {

    const { nombre, cantidad_total, devoluciones_permitidas, id_producto } = item

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const [cantidadActual, setCantidadActual] = useState({
        devoluciones_permitidas, cantidad_total, id_stock: null, lote: null,
        copia: { devoluciones_permitidas, cantidad_total } //=> Sirve para guardar una copia del cantidad original.
    })

    const setCantidad = useCallback((data) => {
        setCantidadActual(data)
    }, [])

    const verificarCantidad = cantidadActual.cantidad_total > 99 ? "99+" : cantidadActual.cantidad_total

    const { tipo, data = {} } = apiData["transsaciones"] || {}

    const apiCall = envioCantidadHelper({
        id_producto,
        id_stock: cantidadActual.id_stock,
        generatePromise,
        loader,
        setCantidadActual,
        tipo,
        data
    })


    return (
        <>
            <CardProducto
                alternarMostrar={alternarMostrar}
                verificarCantidad={verificarCantidad}
                nombre={nombre}
                loader={loader}
            />
            <SuspenseLoadingComponent>
                {mostrar && <InterfazDeRetiroDeProducto
                    id_producto={id_producto}
                    setCantidadActual={setCantidad}
                    loader={loader}
                    tipo={tipo}
                    apiCall={apiCall}
                    cantidadActual={cantidadActual}
                    nombre={nombre}
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar} />}
            </SuspenseLoadingComponent>
        </>
    );
}


export default wrapperNotificacionesServidor(memo(CardProductoContainer))