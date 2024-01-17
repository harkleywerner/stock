import { useForm } from "@/hooks//useForm";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { BuscadorItem } from "./BuscadorItem";
import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { useAlerta } from "@/hooks//useAlerta";


const ModalBodyFormulario = memo(forwardRef((props, ref) => {

    const { changeForm, form } = useForm({ cantidad: 0 })

    useImperativeHandle(ref, () => ({
        cantidad: form.cantidad
    }))

    const verificarCantidad = form.cantidad <= 0 ? 0 : parseInt(Math.abs(form.cantidad))

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
                className="font"
                name="cantidad">

            </Form.Control>
            <i
                onClick={() => onClick(1)}
                style={{ color: "#E84A7A" }}
                className="fa-regular mx-2 fs-3 cursor-pointer  zoom fa-square-plus"></i>
        </div>
    )
}))

const ModalBody = memo(({ parametros, refTest }) => {

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
                <ModalBodyFormulario ref={refTest} />
            </div>
        </Stack>

    )
})

export const InterfazDeNuevoItem = ({ alternarMostrar, mostrar }) => {

    const { insertarParametros, parametros } = useEstablecerParametros()

    const { establercerAlerta, ListaDeAlerta } = useAlerta()

    const [enviar, setEnviar] = useState({})

    const refTest = useRef()

    const onClick = () => {
        if (Object.keys(parametros).length == 0) {
            establercerAlerta({ texto: "Debes agregar un item para continuar", id: "4-warning-item", tipo: "warning" })
        }
    }

    return (
        <Modal
            size="lg"
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header className="d-flex justify-content-center px-lg-5" >
                <div className="w-100 position-relative ">
                    <BuscadorItem insertarParametros={insertarParametros} />
                </div>
            </Modal.Header>
            <Modal.Body style={{ height: "350px" }}>
                <ModalBody
                    refTest={refTest}
                    parametros={parametros} />
            </Modal.Body>
            <Modal.Footer className="d-flex p-1 justify-content-center">
                <Button
                    onClick={onClick}
                    style={{ background: "#57BDC6" }}
                    className="p-2 fs-5 w-50 border-0 transition">
                    Agregar item
                </Button>
                <Button
                    onClick={alternarMostrar}
                    variant="secondary"
                    className="p-2 fs-5 w-50  border-0 transition">
                    Cerrar
                </Button>
            </Modal.Footer>
            {ListaDeAlerta}
        </Modal>
    );
};