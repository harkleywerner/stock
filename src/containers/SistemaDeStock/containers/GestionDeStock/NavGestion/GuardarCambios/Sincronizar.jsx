import { Badge } from "react-bootstrap"

 const  Sincronizar = ({ sync_pendientes = 0 }) => {
    return (
        <div className="d-flex position-relative align-items-center">
            <Badge
                style={{ minWidth: "25px", maxWidth: "25px" }}
                bg="info"
                className=" fs-5 p-1">{sync_pendientes}</Badge>
            <p className="m-0 fw-normal mx-1">Sincronizar</p>
            <i className="fa-solid fa-rotate" />
        </div>
    )
}

export default Sincronizar