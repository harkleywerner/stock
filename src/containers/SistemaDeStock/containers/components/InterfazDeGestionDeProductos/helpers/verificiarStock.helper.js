import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice"
import { useDispatch } from "react-redux"

const verificacionStock = ({
    parametros,
    producto_seleccionado,
    addProducto,
    editProducto,
}) => {

    const dispatch = useDispatch()

    return ({ cantidad_persistente }) => {

        const keysSeleccionado = Object.keys(producto_seleccionado).length

        if (Object.keys(parametros).length == 0) {
            const text = { texto: "Debes agregar un producto para continuar", tipo: "warning" }
            dispatch(generarToast(text))
        }
        else if (keysSeleccionado > 0) {
            dispatch(editProducto({
                ...producto_seleccionado,
                cantidad: cantidad_persistente
            }))
            const text = { texto: "El producto se edito correctamente.", tipo: "info" }
            dispatch(generarToast(text))
        }
        else if (keysSeleccionado == 0) {
            dispatch(addProducto({ ...parametros, cantidad: cantidad_persistente }))
            const text = { texto: "El producto se agrego al listado.", tipo: "info" }
            dispatch(generarToast(text))

        }
    }

}

export default verificacionStock