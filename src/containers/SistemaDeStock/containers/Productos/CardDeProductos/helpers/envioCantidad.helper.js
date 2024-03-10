import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const envioCantidadHelper = (
    {
        loader,
        id_stock,
        id_producto,
        generatePromise,
        setCantidadActual,
        tipo,
        data
    }
) => {

    const { cantidad = 0 } = data

    const dispatch = useDispatch()

    useEffect(() => {

        if (tipo != "success" || loader) return

        setCantidadActual(prev => {
            return {
                ...prev,
                devoluciones_permitidas: prev.devoluciones_permitidas + cantidad,
                cantidad_total: prev.cantidad_total + cantidad,
                copia: {
                    devoluciones_permitidas: prev.copia.devoluciones_permitidas + cantidad,
                    cantidad_total: prev.copia.cantidad_total + cantidad,
                }
            }
        })

        const text = cantidad < 0 ? "Devolviste" : "Retiraste"

        const toast = { texto: `${text} ${Math.abs(cantidad)} unidade/s`, tipo: "success" }

        dispatch(generarToast({ ...toast }))

    }, [loader, tipo])

    return ({ evaluarCantidad }) => {

        if (evaluarCantidad == 0 || loader) return

        const promesa = {
            method: "post", url: "stock/transsaciones", id: "transsaciones",
            data: { cantidad: evaluarCantidad, id_producto, id_stock },
        }

        generatePromise({ promesa })

    }

}