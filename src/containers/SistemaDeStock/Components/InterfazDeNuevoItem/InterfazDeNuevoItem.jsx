import { Button, Modal } from "react-bootstrap";
import { BuscadorItem } from "./BuscadorItem";
import { memo, useEffect, useRef } from "react";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";
import { ModalBody } from "./ModalBody";

const InterfazDeNuevoItem = memo((
    {
        alternarMostrar,
        mostrar,
        parametrosEdit,
        establecerToast,
        state,
        editarItem,
        agregarItem
    }
) => {

    const { insertarParametros, parametros } = useEstablecerParametros()


    useEffect(() => {
        if (!parametrosEdit) return
        insertarParametros({ ...parametrosEdit })
    }, [parametrosEdit])
  

    const onAlternarMostrar = () => {
        alternarMostrar()
    }

    const refImperative = useRef()

    const onClick = () => {

        const keys = Object.keys(parametros)

        const verificaSiSeEncuentra = state.find(item => item.id == parametros.id)

        if (keys.length == 0) {
            return establecerToast({ texto: "Debes agregar un item para continuar", tipo: "warning" })
        }
        else if (verificaSiSeEncuentra && parametrosEdit && verificaSiSeEncuentra.id == parametrosEdit.id || !verificaSiSeEncuentra && parametrosEdit) {

            const { nombre, categoria, id } = parametros

            establecerToast({ texto: `Item ${parametrosEdit.nombre} editado exitosamente `, tipo: "success"})

            editarItem({
                id: parametrosEdit.id,
                idActual: id,
                nombre,
                categoria,
                cantidad: refImperative.current.cantidad
            })
        }
        else if (!parametrosEdit && !verificaSiSeEncuentra) {
            establecerToast({ texto: `${parametros.nombre} agregado exitosamente `, tipo: "success" })
            agregarItem({ ...parametros, cantidad: refImperative.current.cantidad })
        } else {
            return establecerToast({ texto: "El item ya se encuentra en la tabla para cambiar su valor presione en editar en la tabla", tipo: "warning" })
        }

        alternarMostrar()
    }

    return (
        <Modal
            size="lg"
            show={mostrar}
            onHide={onAlternarMostrar}>
            <Modal.Header className="d-flex justify-content-center px-lg-5" >
                <div className="w-100 position-relative ">
                    <BuscadorItem insertarParametros={insertarParametros} />
                </div>
            </Modal.Header>
            <Modal.Body style={{ height: "350px" }}>
                <ModalBody
                    refImperative={refImperative}
                    parametros={parametros} />
            </Modal.Body>
            <Modal.Footer className="d-flex p-1 justify-content-center">
                <Button
                    onClick={onClick}
                    style={{ background: "#57BDC6" }}
                    className="p-2 fs-5 w-50 border-0 transition">
                    {
                        parametrosEdit ? "Guardar cambios" : "Agregar item"
                    }
                </Button>
                <Button
                    onClick={onAlternarMostrar}
                    variant="secondary"
                    className="p-2 fs-5 w-50  border-0 transition">
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
})


export default wrapperNotificaciones(InterfazDeNuevoItem)