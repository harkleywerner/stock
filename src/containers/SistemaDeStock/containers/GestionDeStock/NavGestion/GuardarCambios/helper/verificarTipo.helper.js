import { useEffect } from "react";
import { calcularStockEntranteHelper } from "./calculalStockEntrante.helper";
import { useDispatch } from "react-redux";
import { establecerStockInfo, sincronizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";

export const verificarTipoHelper = ({
    loader,
    stock_data_base,
    lote,
    stockGestion
}) => {

    const dispatch = useDispatch()

    const dispatchToast = (input) => dispatch(generarToast(input))

    const { tipo, failed_commit = {}, success_commit = {} } = stockGestion

    useEffect(() => {

        if (loader) return

        if (tipo == "success") {

            const keyFailedPut = Object.keys(failed_commit["put"]).length

            const keysFailedTotal = Object.keys(failed_commit["delete"]).length + keyFailedPut

            const stockEntrante = calcularStockEntranteHelper({ success_commit, stock_data_base, failed_commit })

            keysFailedTotal == 0 && dispatchToast({ texto: `Todos los cambios del lote #${lote} se guardaron exitosamente`, tipo: "success" })
            
            dispatch(sincronizarStock(stockEntrante))

            dispatch(establecerStockInfo({ sync_pendientes : keyFailedPut }))
            
            keysFailedTotal > 0 && dispatchToast({ texto: `Fallo, ${keysFailedTotal} producto/s debido a la cantidad ingresada o el producto eliminado,no se puede guardar.`, tipo: "danger" })
        }

    }, [loader])

};