import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { Table } from "react-bootstrap";
import styles from "@/styles/TablaDeItems.module.css"
import { lazy, memo } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";
import { PrimeraLetraMayuscula } from "@/helpers//PrimeraLetraMayuscula";

const InterfazDeNuevoItem = lazy(() => import("../InterfazDeNuevoItem/InterfazDeNuevoItem"))

const Thead = memo(() => {
    return (
        <thead className="shadow position-relative ">
            <tr className="text-uppercase">
                <th className="fw-normal fs-5">Nombre</th>
                <th className="fw-normal fs-5">Categoria</th>
                <th className="fw-normal fs-5">Cantidad</th>
                <th className="fw-normal fs-5">Accion</th>
            </tr>
        </thead>
    )
})

const Tbody = memo(({ nombre = "error", categoria = "error", cantidad = -905, insertarParametros, removerItem, id, establecerToast }) => {

    const onRemoveItem = () => {
        removerItem({ id })
        establecerToast({ texto: `Item ${nombre} fue removido`, tipo: "danger" })
    }

    return (
        <tr>
            <td
                style={{ maxWidth: "300px", minWidth: "300px" }}
                className="text-secondary overflow-hidden">
                {nombre}
            </td>
            <td
                style={{ maxWidth: "300px", minWidth: "150px", }}
                className="text-secondary text-nowrap text-truncate ">
                {PrimeraLetraMayuscula(categoria)}
            </td>
            <td className="text-center   ">
                <p
                    style={{ background: "#814937bf" }}
                    className="m-0 rounded-5 text-white">{cantidad}</p>
            </td>
            <td>
                <div className="d-flex justify-content-center">
                    <i
                        onClick={insertarParametros}
                        style={{ color: "#57BDC6" }}
                        className="fa-solid cursor-pointer transition bg-hoverdark fs-4 mx-1 fa-pen"></i>
                    <i
                        onClick={onRemoveItem}
                        className="fa-solid cursor-pointer color-rosa bg-hoverdark transition fs-4 mx-1 fa-trash-can"></i>
                </div>
            </td>
        </tr>
    )
})

const TablaDeItems = ({ state = [], establecerToast, removerItem, agregarItem, editarItem }) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { insertarParametros, parametros } = useEstablecerParametros()


    return (
        <div
            style={{ maxWidth: "min-content" }}
            className="table-resposive mt-lg-3  w-100 scrollbar">
            <Table
                id={styles.tablaDeItems}
                bordered
                striped
                hover
                className=" shadow p-0 my-0  " >
                <Thead />
                <tbody >
                    {
                        state.map((item, index) =>
                            <Tbody
                                removerItem={removerItem}
                                establecerToast={establecerToast}
                                insertarParametros={() => { insertarParametros(item), alternarMostrar() }}
                                key={index}
                                {...item} />)
                    }
                </tbody>
            </Table>

            <SuspenseLoadingComponent
                texto="Cargando interfaz">
                {mostrar && <InterfazDeNuevoItem
                    state={state}
                    agregarItem={agregarItem}
                    editarItem={editarItem}
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar}
                    parametrosEdit={parametros} />
                }
            </SuspenseLoadingComponent>

        </div>
    );
};

export default wrapperNotificaciones(TablaDeItems)