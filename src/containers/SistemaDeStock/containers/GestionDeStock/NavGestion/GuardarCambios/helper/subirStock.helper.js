import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calcularStockSalienteHelper } from "./calcularStockSaliente.helper";
import { establecerPendientes } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import axios from "axios";

export const subirStockHelper = ({
    inicializado,
    generatePromise,
    id_stock,
    stock_data_base,
    stock,
    cambios_pendientes
}) => {

    const dispatch = useDispatch()

    const cancelToken = axios.CancelToken.source()

    const { contador_de_cambios, cambios } = calcularStockSalienteHelper({ stock, stock_data_base })

    useEffect(() => {
        if (contador_de_cambios !== cambios_pendientes) {
            dispatch(establecerPendientes({ cambios_pendientes: contador_de_cambios }))
        }
        return () => {
            cancelToken.cancel()
        }

    }, [contador_de_cambios])

    return () => {
        if (!inicializado) return
        const promesa = {
            method: "PATCH", url: `stock/gestion`, id: "stock/gestion",
            data: { id_stock, lista_de_cambios: cambios },
            cancelToken: cancelToken.token
        }
        if (cambios.length == 0) {
            dispatch(generarToast(({ texto: "Debes realizar algun cambio.", tipo: "warning" })))
        }
        else {
            generatePromise({ promesa })
        }
    }

};