import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import InterfazDeGestionDeProductos from "../InterfazDeGestionDeProductos/InterfazDeGestionDeProductos";
import { Table } from "react-bootstrap";
import TbodyTablaDeProductos from "./TbodyTablaDeProductos";
import TheadTablaDeProductos from "./TheadTablaDeProductos";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { memo, useContext, useState } from "react";
import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";


const TablaDeProductos = memo(({
    stock = [],
    addProducto,
    deleteProducto,
    editProducto,
    inicializado
}) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { insertarParametros, parametros } = useEstablecerParametros()

    const { sucursal_info } = useContext(informacionInicialContext)

    const { loggeado } = sucursal_info

    return (
        <div
            style={{ maxWidth: "min-content" }}
            className="table-resposive mt-lg-3  w-100 ">
            <Table
                bordered
                striped
                hover
                className=" shadow p-0 my-0  " >
                <TheadTablaDeProductos loggeado={loggeado} />
                <tbody >
                    {
                        stock.map((item) =>
                            <TbodyTablaDeProductos
                                loggeado={loggeado}
                                deleteProducto={deleteProducto}
                                inicializado={inicializado}
                                insertarParametros={insertarParametros}
                                alternarMostrar={alternarMostrar}
                                key={item.id_producto}
                                item={item}
                            />)
                    }
                </tbody>
            </Table>

            <SuspenseLoadingComponent>
                {mostrar && inicializado && <InterfazDeGestionDeProductos
                    stock={stock}
                    addProducto={addProducto}
                    editProducto={editProducto}
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar}
                    productoSeleccionado={parametros} />
                }
            </SuspenseLoadingComponent>

        </div>
    );
})

export default TablaDeProductos

