import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const envioCantidadHelper = (
    {
        devoluciones_permitidas,
        loader,
        evaluarCantidad,
        cantidad_total,
        cantidadBackUp,
        generatePromise,
        setCantidadActual,
        restablecerFormulario,
        id_stock,
        id_producto,
        lote
    }
) => {

    const dispatch = useDispatch()

    useEffect(() => {

        if (!loader) return

        const devolucionesTotal = devoluciones_permitidas - evaluarCantidad

        const retiroTotal = cantidad_total - evaluarCantidad

        cantidadBackUp.current = {
            devoluciones_permitidas: cantidadBackUp.current.devoluciones_permitidas - evaluarCantidad,
            cantidad_total: cantidadBackUp.current.cantidad_total - evaluarCantidad
        }

        setCantidadActual({ devoluciones_permitidas: devolucionesTotal, cantidad_total: retiroTotal,lote })

        const text = evaluarCantidad < 0 ? "Devolviste" : "Retiraste"

        const toast = { texto: `${text} ${Math.abs(evaluarCantidad)} unidade/s`, tipo: "success" }

        dispatch(generarToast({ ...toast }))

        restablecerFormulario()
    }, [loader])

    return () => {

        if (evaluarCantidad == 0 || loader) return

        const promesa = {
            method: "post", url: "trassaciones", id: "trassaciones",
            data: { cantidad: evaluarCantidad, id_producto, id_stock },
        }

        generatePromise({ promesa })


    }

}