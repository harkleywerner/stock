import { useForm } from "@/hooks//useForm"
import { memo } from "react"
import { Form } from "react-bootstrap"

export const CantidadInput = memo(({ cantidad_inicial = 0, cantidad_persistente }) => {

    const { changeForm, form } = useForm({ cantidad: Math.abs(cantidad_inicial) })

    const verificarCantidad = form.cantidad <= 0 ? 0 : parseInt(form.cantidad)

    cantidad_persistente.current = verificarCantidad

    const onClick = (number) => {
        changeForm({ target: { name: "cantidad", value: verificarCantidad + number } })
    }

    return (
        <div className="d-flex align-items-center">
            <i
                onClick={() => onClick(-1)}
                style={{ color: "#E84A7A" }}
                className="fa-regular fs-3 mx-2 cursor-pointer  zoom fa-square-minus"></i>
            <Form.Control
                onChange={changeForm}
                value={verificarCantidad == 0 ? "" : verificarCantidad}
                type="number"
                name="cantidad">

            </Form.Control>
            <i
                onClick={() => onClick(1)}
                style={{ color: "#E84A7A" }}
                className="fa-regular mx-2 fs-3 cursor-pointer  zoom fa-square-plus"></i>
        </div>
    )
})
