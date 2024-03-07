import { memo } from "react"

const TheadTablaDeProductos = memo(({
    loggeado
}) => {
    return (
        <thead className="shadow position-relative ">
            <tr className="text-uppercase">
                <th className="fw-normal fs-5">Nombre</th>
                <th className="fw-normal fs-5">Categoria</th>
                <th className="fw-normal fs-5">Cantidad</th>
              {
                loggeado &&   <th className="fw-normal fs-5">Accion</th>
              }
            </tr>
        </thead>
    )
})

export default TheadTablaDeProductos