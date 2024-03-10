import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { useDispatch } from "react-redux";

export const subirStockHelper = ({
    inicializado,
    generatePromise,
    id_stock,
    contador_de_cambios,
    cambios,
}) => {

    const dispatch = useDispatch()

    return () => {
        if (!inicializado) return

        const promesa = {
            method: "PATCH", url: `stock/gestion`, id: "stock/gestion",
            data: { id_stock, lista_de_cambios: cambios },
        }
        if (contador_de_cambios == 0) {
            dispatch(generarToast(({ texto: "Debes realizar algun cambio.", tipo: "warning" })))
        }
        else {
            generatePromise({ promesa })
        }
    }

};