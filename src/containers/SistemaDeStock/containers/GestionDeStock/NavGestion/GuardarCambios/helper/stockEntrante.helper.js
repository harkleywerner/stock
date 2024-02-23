import { establecerPendientes, sincronizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calcularStockEntranteHelper } from "./calculalStockEntrante.helper";

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

    const { failed_commit = {}} = data

    useEffect(() => {

        if (loader) return

        if (tipo == "success") {

            const keyFailedPut = Object.keys(failed_commit["f_patch"]).length

            const keysFailedTotal = Object.keys(failed_commit["f_delete"]).length + keyFailedPut

            const {nuevoStock,contador_sync_pendientes} = calcularStockEntranteHelper({ stock ,stock_data_base, data })

            keysFailedTotal == 0 && dispatchToast({ texto: `Todos los cambios del lote #${lote} se guardaron exitosamente`, tipo: "success" })

            dispatch(sincronizarStock(nuevoStock))

            dispatch(establecerPendientes({ sync_pendientes: contador_sync_pendientes }))

            keysFailedTotal > 0 && dispatchToast({ texto: `Fallo, ${keysFailedTotal} producto/s debido a la cantidad ingresada o el producto eliminado,no se puede guardar.`, tipo: "danger" })
        }

    }, [loader])

};