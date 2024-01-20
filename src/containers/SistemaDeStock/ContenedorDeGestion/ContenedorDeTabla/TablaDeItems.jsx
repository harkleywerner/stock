import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import wrapperAlerta from "@/provider//AlertaProvider/wrapperAlerta";
import { Table } from "react-bootstrap";
import styles from "@/styles/TablaDeItems.module.css"
import { lazy, memo } from "react";

const InterfazDeNuevoItem = lazy(() => import("../InterfazDeNuevoItem/InterfazDeNuevoItem"))

const Thead = () => {
    return (
        <thead className="shadow position-relative ">
            <tr >
                <th className="fw-normal fs-5">Nombre</th>
                <th className="fw-normal fs-5">Categoria</th>
                <th className="fw-normal fs-5">Cantidad</th>
                <th className="fw-normal text-center fs-5">Accion</th>
            </tr>
        </thead>
    )
}

const Tbody = memo(({ nombre = "error", categoria = "error", cantidad = -905, insertarParametros, removerItem, id, establercerAlerta }) => {

    const onRemoveItem = () => {
        removerItem({ id })
        establercerAlerta({ texto: `Item ${nombre} fue removido`, multiples: true, id: "1-remove-danger", tipo: "danger" })
    }

    return (
        <tr>
            <td
                style={{ maxWidth: "300px", minWidth: "300px" }}
                className="text-secondary fs-5 overflow-hidden">
                {nombre}
            </td>
            <td
                style={{ maxWidth: "150px", minWidth: "150px" }}
                className="text-secondary fs-5">
                {categoria}
            </td>
            <td className="text-secondary fs-5">
                {cantidad}
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

const TablaDeItems = ({ state = [], establercerAlerta, removerItem }) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { insertarParametros, parametros } = useEstablecerParametros()


    return (
        <div style={{ maxWidth: "min-content" }} className="table-resposive mt-lg-3  w-100 scrollbar">
            <Table
                id={styles.tablaDeItems}
                striped bordered
                className="w-75 shadow p-0 my-0  " >
                <Thead />
                <tbody >
                    {
                        state.map((item, index) =>
                            <Tbody
                                removerItem={removerItem}
                                establercerAlerta={establercerAlerta}
                                insertarParametros={() => { insertarParametros(item), alternarMostrar() }}
                                key={index}
                                {...item} />)
                    }
                </tbody>
            </Table>

            <SuspenseLoadingComponent
                texto="Cargando interfaz">
                {mostrar && <InterfazDeNuevoItem
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar}
                    parametrosEdit={parametros} />
                }
            </SuspenseLoadingComponent>

        </div>
    );
};

export default wrapperAlerta(TablaDeItems)