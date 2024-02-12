import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import InterfazDeGestionDeProductos from "../InterfazDeGestionDeProductos/InterfazDeGestionDeProductos";
import { Table } from "react-bootstrap";
import TbodyTablaDeProductos from "./TbodyTablaDeProductos";
import TheadTablaDeProductos from "./TheadTablaDeProductos";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { memo } from "react";


const TablaDeProductos = memo(({ stock = [], addProducto, deleteProducto, editProducto, }) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { insertarParametros, parametros } = useEstablecerParametros()

    return (
        <div
            style={{ maxWidth: "min-content" }}
            className="table-resposive mt-lg-3  w-100 scrollbar">
            <Table
                // id={styles.tablaDeItems}
                bordered
                striped
                hover
                className=" shadow p-0 my-0  " >
                <TheadTablaDeProductos />
                <tbody >
                    {
                        stock.map((item, index) =>
                            <TbodyTablaDeProductos
                                deleteProducto={deleteProducto}
                                insertarParametros={() => { insertarParametros(item), alternarMostrar() }}
                                key={index}
                                {...item} />)
                    }
                </tbody>
            </Table>

            <SuspenseLoadingComponent>
                {mostrar && <InterfazDeGestionDeProductos
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

