import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { gestionDeStockContext } from "@/provider//GestionDeStockProvider/GestionDeStockProvider";
import { lazy, memo, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import TbodyDefault from "../Components/ContenedorDeTabla/TablaDeItems";
import TheadDefault from "../Components/ContenedorDeTabla/TheadTablaDefault";
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones";

const InterfazDeGestionDeProductos = lazy(() => import("../Components/InterfazDeGestionDeProductos/InterfazDeGestionDeProductos"))

const ListaTbody = wrapperNotificaciones(({
    establecerToast,
    removerItem,
    insertarParametros,
    editarItem,
    item
}) => {

    return (
        <TbodyDefault
            establecerToast={establecerToast}
            insertarParametros={insertarParametros}
            editarItem={editarItem}
            removerItem={removerItem}
            {...item} />
    )
})

export const TablaGestion = memo(({ stock }) => {

    const { insertarParametros, parametros } = useEstablecerParametros()

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { state, removerItem, editarItem, inicilizarState } = useContext(gestionDeStockContext)["ultimaTabla"]

    useEffect(() => {
        if (stock.length == 0) return
        inicilizarState(stock)
    }, [])

    return (
        <div
            style={{ maxWidth: "min-content" }}
            className="table-resposive mt-lg-3  w-100 scrollbar">
            <Table
                bordered
                striped
                hover
                className=" shadow p-0 my-0  " >
                <TheadDefault />
                <tbody >
                    {
                        state.map(item =>
                            <ListaTbody
                                key={item.id_producto}
                                item={item}
                                insertarParametros={() => { insertarParametros(item), alternarMostrar() }}
                                removerItem={removerItem}
                                editarItem={editarItem} />
                        )
                    }
                </tbody>

            </Table>

            <SuspenseLoadingComponent>
                {
                    mostrar &&
                    <InterfazDeGestionDeProductos
                        state={state}
                        removerItem={removerItem}
                        editarItem={editarItem}
                        mostrar={mostrar}
                        alternarMostrar={alternarMostrar}
                        parametrosEdit={parametros}
                    />
                }
            </SuspenseLoadingComponent>

        </div>
    );
})