import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calcularStockSalienteHelper } from "./calcularStockSaliente.helper";
import { establecerPendientes } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";

export const subirStockHelper = ({
    inicializado,
    generatePromise,
    id_stock,
    stock_data_base,
    stock,
    cambios_pendientes
}) => {

    const dispatch = useDispatch()

    const cambios = calcularStockSalienteHelper({ stock, stock_data_base })


    useEffect(() => {
        if (cambios.length == cambios_pendientes) return
          dispatch(establecerPendientes({cambios_pendientes : cambios.length}))
    }, [cambios.length])

    return () => {
        if (!inicializado) return
        const promesa = {
            method: "PUT", url: `stock/gestion`, id: "stock/gestion",
            data: { id_stock, lista_de_cambios: cambios },
        }
        if (cambios.length == 0) {
            dispatch(generarToast(({ texto: "Debes realizar algun cambio.", tipo: "warning" })))
        }
        else {
            generatePromise({ promesas: [promesa] })
        }
    }

};