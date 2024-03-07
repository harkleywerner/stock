import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice"
import { PrimeraLetraMayusculaUtils } from "@/utils/PrimeraLetraMayuscula.utils"
import { memo } from "react"
import { useDispatch } from "react-redux"



const TbodyTablaDeProductos = memo(({
    nombre,
    categoria,
    cantidad,
    insertarParametros,
    deleteProducto,
    id_producto,
    inicializado,
    loggeado
}) => {

    const dispatch = useDispatch()

    const onRemoveItem = () => {
        if (!inicializado) return
        dispatch(deleteProducto({ id_producto }))
        const toast = { texto: `Item ${nombre} fue removido`, tipo: "danger" }
        dispatch(generarToast(toast))

    }

    return (
        <tr>
            <td
                style={{ maxWidth: "300px", minWidth: "300px" }}
                className="text-secondary overflow-hidden">
                {nombre}
            </td>
            <td
                style={{ maxWidth: "300px", minWidth: "150px", }}
                className="text-secondary text-nowrap text-truncate ">
                {PrimeraLetraMayusculaUtils(categoria)}
            </td>
            <td className="text-center d-flex  justify-content-center ">
                <div className="position-relative">
                    <p
                        className="m-0 rounded-5 text-dark">{cantidad}</p>
                </div>
            </td>
            {
                loggeado &&
                <td>
                    <div className="d-flex justify-content-center">
                        <i
                            onClick={insertarParametros}
                            style={{ color: "#57BDC6" }}
                            className="fa-solid cursor-pointer transition bg-hoverdark fs-4 mx-1 fa-pen"></i>
                        <i
                            onClick={onRemoveItem}
                            className="fa-solid cursor-pointer color-rosa bg-hoverdark transition fs-4 mx-1 fa-trash-can"></i>
                    </div>
                </td>
            }
        </tr>
    )
})

export default TbodyTablaDeProductos