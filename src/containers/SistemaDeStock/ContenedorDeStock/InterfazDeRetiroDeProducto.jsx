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

const establecerRetiros = ({ listaDeCantidades, total, verificacion }) => {


    console.log(verificacion)
    let nuevoArray = []
    for (const iterator of listaDeCantidades) {

        if (total == 0) break
        const retiradoN = Math.min(iterator.cantidad, Math.abs(total))
        nuevoArray = [...nuevoArray, { ...iterator, retirado: verificacion ? -retiradoN : retiradoN  }]

        total = verificacion ? total + iterator.cantidad : total - iterator.cantidad
    }

    return nuevoArray
}

const InterfazDeRetiroDeProducto = memo(({ alternarMostrar, mostrar, setListaDeRetirados, establercerAlerta, parametros, listaDeRetirados }) => {

    const { nombre, listaDeCantidades, cantidadTotal, devoluciones_permitidas } = parametros

    const { changeForm, form, restablecerFormulario } = useForm({ cantidad: 0 })

    const { cantidad } = form

    const buscarLista = listaDeRetirados[nombre]

    const sumarRetirado = sumarRetirados(buscarLista)

    const cantidadActual = sumarRetirado || cantidadTotal

    const verificarDevoluciones = sumarRetirado - (-devoluciones_permitidas)

    const cantidadEnt = parseInt(cantidad) || 0

    const verificarSigno = verificarDevoluciones <= 0 ? Math.abs(cantidadEnt) : cantidadEnt <= -verificarDevoluciones ? -verificarDevoluciones : cantidadEnt

    const test = buscarLista ? sumarRetirado < 0 ?  Math.abs(sumarRetirado) :  (cantidadTotal - cantidadActual) : cantidadTotal

    const evaluarCantidad = verificarSigno > test ? test : verificarSigno



    const enviarCantidad = () => {

        // if (evaluarCantidad <= 0) return

        establercerAlerta({ texto: `Retirtaste ${evaluarCantidad} items de ${nombre}`, tipo: "success", id: "success-retiro" })

        let total2 = buscarLista ? cantidadActual + evaluarCantidad : evaluarCantidad
        let total = verificarDevoluciones > 0 && cantidadEnt < 0 ? (-verificarDevoluciones) : total2

        setListaDeRetirados({
            ...listaDeRetirados,
            [nombre]: establecerRetiros({ listaDeCantidades, total, verificacion: verificarDevoluciones > 0 && cantidadEnt < 0 })
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
                        {test}
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