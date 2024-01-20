import { Button, Modal } from "react-bootstrap";
import { BuscadorItem } from "./BuscadorItem";
import { memo, useContext, useEffect, useRef } from "react";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { nuevoStockContext } from "@/provider//NuevoStockProvider";
import wrapperAlerta from "@/provider//AlertaProvider/wrapperAlerta";
import { ModalBody } from "./ModalBody";
import { useLocation } from "react-router-dom";


const InterfazDeNuevoItem = memo(({ alternarMostrar, mostrar, parametrosEdit, establercerAlerta }) => {

    const { insertarParametros, parametros } = useEstablecerParametros()

    const { pathname } = useLocation()

    const splitPathname = pathname.split("/").length

    const { agregarItem, editarItem, state } = useContext(nuevoStockContext)[splitPathname == 3 ? "ultimaTabla" : "nuevaTabla"]

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
            return establercerAlerta({ texto: "Debes agregar un item para continuar", id: "1-warning-item", tipo: "warning" })
        }
        else if (verificaSiSeEncuentra && parametrosEdit && verificaSiSeEncuentra.id == parametrosEdit.id || !verificaSiSeEncuentra && parametrosEdit) {

            const { nombre, categoria, id } = parametros

            establercerAlerta({ texto: `Item ${parametrosEdit.nombre} editado exitosamente `, id: "1-success-item", tipo: "success", multiples: true })

            editarItem({
                id: parametrosEdit.id,
                idActual: id,
                nombre,
                categoria,
                cantidad: refImperative.current.cantidad
            })
        }
        else if (!parametrosEdit && !verificaSiSeEncuentra) {
            establercerAlerta({ texto: `Item ${parametros.nombre} agregado exitosamente `, id: "2-success-item", tipo: "success" })
            agregarItem({ ...parametros, cantidad: refImperative.current.cantidad })
        } else {
            return establercerAlerta({ texto: "El item ya se encuentra en la tabla para cambiar su valor presione en editar en la tabla", id: "2-warning-item", tipo: "warning" })
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


export default wrapperAlerta(InterfazDeNuevoItem)