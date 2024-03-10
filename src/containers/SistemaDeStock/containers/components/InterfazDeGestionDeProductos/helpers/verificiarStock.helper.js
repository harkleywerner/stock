import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice"
import { useDispatch } from "react-redux"

const verificacionStock = ({
    stock,
    parametros,
    productoSeleccionado,
    addProducto,
    editProducto,
    keys
}) => {

    const dispatch = useDispatch()

    return ({ refCantidad }) => {
        const verificaSiSeEncuentra = stock.find(item => item.id_producto == parametros.id_producto)

        if (Object.keys(parametros).length == 0) {
            const text = { texto: "Debes agregar un producto para continuar", tipo: "warning" }
            dispatch(generarToast(text))
        }
        else if ( verificaSiSeEncuentra && verificaSiSeEncuentra.id_producto == productoSeleccionado.id_producto) {
            dispatch(editProducto({
                ...verificaSiSeEncuentra,
                cantidad: refCantidad
            }))
        }
        else if (keys == 0 && !verificaSiSeEncuentra) {
            dispatch(addProducto({ ...parametros, cantidad: refCantidad }))
            const text = { texto: "El producto se agrego correctamente.", tipo: "success" }
            dispatch(generarToast(text))

        } else {
            const text = { texto: "El item ya se encuentra en la tabla para cambiar su valor presione en editar en la tabla", tipo: "warning" }
            dispatch(generarToast(text))
        }

    }

}

export default verificacionStock