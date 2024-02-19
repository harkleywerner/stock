import { Badge } from "react-bootstrap"

export const Guardar = ({ cambios = 0 }) => {
    return (
        <div className="d-flex align-items-center">
            <Badge
                style={{ minWidth: "25px", maxWidth: "25px" }}
                bg="info"
                className="fs-5 p-1">{cambios}</Badge>
            <p className="m-0 fw-normal mx-1">Guardar Cambios</p>
            <i className="fa-solid fs-4 fa-cloud-arrow-down"></i>
        </div>
    )
}
