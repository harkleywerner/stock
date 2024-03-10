import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { memo } from "react";
import ScrollingLote from "./ScrollingLote";

const DropDownLote = memo(({
    id_producto,
    lote,
}) => {

    return (
        <div className="dropdown ms-1 mb-2">

            <button
                type="button"
                style={{ maxWidth: "200px", minWidth: "200px", backgroundColor: "#DE4E75", borderBottom: "4px solid #b12540" }}
                data-bs-auto-close="outside"
                className="btn d-flex text-white align-items-center rounded-3 justify-content-between "
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className="fa-solid text-secondary text-white fs-4 fa-box-open"></i>
                <span className="m-0 text-white  text-truncate">{lote ? `#${lote}` : "Todos"}</span>
            </button>

            <ScrollingLote
                id_producto={id_producto}
            />
        </div>
    );
})

export default wrapperNotificacionesServidor(DropDownLote)