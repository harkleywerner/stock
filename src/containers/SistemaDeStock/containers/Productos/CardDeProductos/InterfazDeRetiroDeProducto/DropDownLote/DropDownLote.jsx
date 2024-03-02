import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { memo } from "react";
import ScrollingLote from "./ScrollingLote";

const DropDownLote = memo(({
    id_producto,
    lote,
}) => {

    return (
        <div className="dropdown ms-3">
            <button
                type="button"
                style={{ maxWidth: "200px", minWidth: "200px", backgroundColor: "#57BDC6" }}
                data-bs-auto-close="outside"
                className="btn  d-flex border-secondary align-items-center justify-content-between dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className="fa-solid text-secondary text-white fs-4 fa-box-open"></i>
                <span className="m-0 text-white  text-truncate">Lote #{lote}</span>
            </button>
            <ScrollingLote
                id_producto={id_producto}
            />
        </div>
    );
})

export default wrapperNotificacionesServidor(DropDownLote)