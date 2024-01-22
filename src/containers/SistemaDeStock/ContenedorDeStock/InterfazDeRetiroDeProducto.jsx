import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "@/hooks/useForm";
import wrapperAlerta from "@/provider//AlertaProvider/wrapperAlerta";
import { memo } from "react";

const sumarRetirados = (listaDeRetirados) => {
    if (!listaDeRetirados) return 0
    return listaDeRetirados.reduce((acc, current) => {

        return acc + (current.retirado || 0)

    }, 0)
}

const establecerRetiros = ({ listaDeCantidades, total }) => {
    let nuevoArray = []

    for (const iterator of listaDeCantidades) {

        if (total <= 0) break
        const retirado = Math.min(iterator.cantidad, total)
        nuevoArray = [...nuevoArray, { ...iterator, retirado }]

        total = total - iterator.cantidad
    }

    return nuevoArray
}

const establecerDevoluciones = ({ listaDeCantidades, total }) => {
    let nuevoArray = []

    for (const iterator of listaDeCantidades) {

        if (total <= 0) break

        const retirado = Math.min(-iterator.cantidad, total)

        nuevoArray = [...nuevoArray, { ...iterator, retirado }]

        total = total - iterator.cantidad
    }


    return nuevoArray
}

const evaluarCantidades = ({ cantidad, cantidadActual, verificarDiponibilidad }) => {

    const cantidadEnt = parseInt(cantidad)

    const disponibilidad = verificarDiponibilidad < 0 ? 0 : -verificarDiponibilidad

    if (cantidadEnt >= cantidadActual) {
        return cantidadActual
    }
    else if (cantidadEnt <= disponibilidad) {
        return disponibilidad
    }

    return cantidadEnt

}

const InterfazDeRetiroDeProducto = memo((
    {
        alternarMostrar,
        mostrar,
        setListaDeRetirados,
        establercerAlerta,
        parametros,
        listaDeRetirados
    }
) => {

    const { nombre, listaDeCantidades, cantidad_total, devoluciones_permitidas } = parametros

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const buscarLista = listaDeRetirados[nombre]

    const sumarRetirado = sumarRetirados(buscarLista)

    const cantidadTotal = buscarLista ?
        sumarRetirado < 0 && cantidad_total + sumarRetirado <= 0 ? Math.abs(sumarRetirado)
            : cantidad_total - sumarRetirado
        : cantidad_total

    const cantidadActual = Math.sign(cantidadTotal) == -1 ? 0 : cantidadTotal

    const combinado = sumarRetirado + (devoluciones_permitidas)  

    console.log(combinado)
    const verificarDiponibilidad =  combinado >= cantidad_total + devoluciones_permitidas  ? cantidad_total + devoluciones_permitidas : combinado

    const evaluarCantidad = evaluarCantidades({ cantidad, cantidadActual, verificarDiponibilidad }) || 0

    const enviarCantidad = () => {


        let total = Math.abs(evaluarCantidad)

        let nuevoArray = []

        if (cantidad < 0 && verificarDiponibilidad > 0) {
            nuevoArray = establecerDevoluciones({ listaDeCantidades, total })
        } else {
            nuevoArray = establecerRetiros({ listaDeCantidades, total })
        }

        setListaDeRetirados({
            ...listaDeRetirados,
            [nombre]: nuevoArray
        })

        restablecerFormulario()
    }

    return (
        <Modal
            show={mostrar}
            animation={true}
            onHide={alternarMostrar}>
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                    <p className="m-0 text-secondary fw-normal">
                        {nombre}
                    </p>
                    <p className="m-0 fs-5 font text-secondary fw-normal mt-1 mx-2">{evaluarCantidad == "" ? 0 : evaluarCantidad}
                        <span className="font">/</span>
                        {cantidadActual}
                    </p>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>

                <Form.Control
                    type="number"
                    className="fs-4 font text-secondary"
                    onChange={changeForm}
                    name="cantidad"
                    value={evaluarCantidad == 0 ? "" : evaluarCantidad}
                    placeholder="Ingresa la cantidad"
                />

            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={enviarCantidad}
                    style={{ background: "#57BDC6" }}
                    className="w-100 border-0 fs-5 transition">
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>
    );
})

export default wrapperAlerta(InterfazDeRetiroDeProducto)