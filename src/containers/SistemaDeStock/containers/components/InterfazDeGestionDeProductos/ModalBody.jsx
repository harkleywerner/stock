import { useForm } from "@/hooks//useForm"
import { memo, useEffect } from "react"
import { Form, Stack } from "react-bootstrap"

const ModalBodyFormulario = memo(({ parametroCantidad = 0, refImperative }) => {

    const { changeForm, form } = useForm({ cantidad: Math.abs(parametroCantidad) })

    const verificarCantidad = form.cantidad <= 0 ? 0 : parseInt(Math.abs(form.cantidad))

    refImperative.current = verificarCantidad

    useEffect(() => {
        changeForm({ target: { name: "cantidad", value: Math.abs(parametroCantidad) } })
    }, [parametroCantidad])


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

export const ModalBody = memo(({ parametros, refImperative }) => {

    const { nombre, categoria } = parametros

    const keys = Object.keys(parametros)

    return (
        <Stack
            gap={4}
            className="justify-content-center align-items-center  h-100">
            <div className="">
                <p className="m-0 fs-3 text-center">Nombre</p>
                <p className="text-center fw-normal m-0 fs-3 text-secondary">{keys.length == 0 ? "No definido" : nombre}</p>
            </div>
            <div className="">
                <p className="m-0 fs-3 text-center">Categoria</p>
                <p className="text-center fw-normal m-0 fs-3 text-secondary">{keys.length == 0 ? "No definido" : categoria}</p>
            </div>
            <div className="">
                <p className="m-0 fs-3 text-center">Cantidad</p>
                <ModalBodyFormulario
                    parametroCantidad={parametros.cantidad}
                    refImperative={refImperative} />
            </div>
        </Stack>

    )
})