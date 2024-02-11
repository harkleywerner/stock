import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";
import { PrimeraLetraMayuscula } from "@/utils/PrimeraLetraMayuscula";
import { memo } from "react";



const TbodyDefault = wrapperNotificaciones(memo(({
    nombre = "error",
    categoria = "error",
    cantidad = -905,
    insertarParametros,
    removerItem,
    id_producto,
    establecerToast
}) => {

    const onRemoveItem = () => {
        removerItem({ id_producto })
        establecerToast({ texto: `Item ${nombre} fue removido`, tipo: "danger" })
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
                {PrimeraLetraMayuscula(categoria)}
            </td>
            <td className="text-center   ">
                <p
                    className="m-0 rounded-5 text-dark">{cantidad}</p>
            </td>
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
        </tr>
    )
}))


export default TbodyDefault

