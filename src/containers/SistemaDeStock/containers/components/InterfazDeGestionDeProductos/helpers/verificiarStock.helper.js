import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice"
import { useDispatch } from "react-redux"

const verificacionStock = ({
    stock,
    parametros,
    productoSeleccionado,
    addProducto,
    editProducto
}) => {

    const dispatch = useDispatch()

    const verificacion = ({ refCantidad }) => {

        const verificaSiSeEncuentra = stock.find(item => item.id_producto == parametros.id_producto)

        if (Object.keys(parametros).length == 0) {
            const text = { texto: "Debes agregar un item para continuar", tipo: "warning" }
            dispatch(generarToast(text))
        }

        else if (verificaSiSeEncuentra && verificaSiSeEncuentra.id_producto == productoSeleccionado.id_producto) {
            dispatch(editProducto({
                ...parametros,
                id_producto: productoSeleccionado.id_producto,
                id_actual: parametros.id_producto,
                cantidad: refCantidad
            }))

            return true
        }
        else if (Object.keys(productoSeleccionado).length == 0 && !verificaSiSeEncuentra) {
            dispatch(addProducto({ ...parametros, cantidad: refCantidad }))

            return true

        } else {
            const text = { texto: "El item ya se encuentra en la tabla para cambiar su valor presione en editar en la tabla", tipo: "warning" }
            dispatch(generarToast(text))
        }

    }

    return verificacion
}

export default verificacionStock