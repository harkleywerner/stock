import { establecerPendientes, sincronizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calcularStockEntranteHelper } from "./calculalStockEntrante.helper";
import { calcularFailedTotalHelper } from "./calcularFailedTotal.helper";

export const stockEntranteHelper = ({
    loader,
    stock_data_base,
    lote,
    stockGestion,
    stock
}) => {

    const dispatch = useDispatch()

    const dispatchToast = (input) => dispatch(generarToast(input))

    const { tipo, data = {} } = stockGestion

    useEffect(() => {

        if (loader) return

        if (tipo == "success") {

            const { failedTotal } = calcularFailedTotalHelper(data["failed_commit"])

            const { nuevoStock, contador_sync_pendientes } = calcularStockEntranteHelper({ stock, stock_data_base, data })

            failedTotal == 0 && dispatchToast({ texto: `Todos los cambios del lote #${lote} se guardaron exitosamente`, tipo: "success" })

            dispatch(sincronizarStock(nuevoStock))

            dispatch(establecerPendientes({ sync_pendientes: contador_sync_pendientes }))

            failedTotal > 0 && dispatchToast({ texto: `Fallo, ${failedTotal} producto/s debido a algun parametro incorrecto..`, tipo: "danger" })
        }

    }, [loader])

};