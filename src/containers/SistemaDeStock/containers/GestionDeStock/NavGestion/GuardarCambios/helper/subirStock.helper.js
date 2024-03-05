import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const subirStockHelper = ({
    inicializado,
    generatePromise,
    id_stock,
    contador_de_cambios,
    cambios,
}) => {

    const dispatch = useDispatch()

    const cancelToken = axios.CancelToken.source()

    useEffect(() => {
        return () => {
            cancelToken.cancel()
        }
    }, [])

    return () => {
        if (!inicializado) return

        const promesa = {
            method: "PATCH", url: `stock/gestion`, id: "stock/gestion",
            data: { id_stock, lista_de_cambios: cambios },
            cancelToken: cancelToken.token
        }
        if (contador_de_cambios == 0) {
            dispatch(generarToast(({ texto: "Debes realizar algun cambio.", tipo: "warning" })))
        }
        else {
            generatePromise({ promesa })
        }
    }

};