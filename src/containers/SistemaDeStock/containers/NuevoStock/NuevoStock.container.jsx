
import { Col } from "react-bootstrap";
import TablaDeProductos from "../components/ContenedorDeTabla/TablaDeProductos";
import { useSelector } from "react-redux";
import { addProducto, editProducto, deleteProducto } from "@/store//reducer/nuevoStock/nuevoStock.slice";
import { memo, useContext, useEffect } from "react";
import { useFiltroProductosHook } from "../hooks/useFiltroTablas.hook";
import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";
import { useNavigate } from "react-router-dom";

const Message = memo(() => (
    <p className="text-white h-100  d-flex justify-content-center align-items-center resaltador  fs-5 m-auto text-center">No se encontraron  productos en la tabla...</p>
))

const NuevoStockContainer = () => {

    const { sucursal_info } = useContext(informacionInicialContext)

    const { loggeado } = sucursal_info

    const nav = useNavigate()

    useEffect(() => {
        if (!loggeado) {
            nav("/stock")
        }
    }, [loggeado])
    
    const { stock, inicializado } = useSelector(state => state.nuevo_stock)

    const nuevoEstado = useFiltroProductosHook(stock)

    return (
        <Col className="p-0 overflow-hidden d-flex justify-content-center h-100">
            <section className="scrollbar h-100">
                {
                    nuevoEstado.length == 0 ?
                        <Message />
                        : <TablaDeProductos
                            inicializado={inicializado}
                            addProducto={addProducto}
                            editProducto={editProducto}
                            deleteProducto={deleteProducto}
                            stock={nuevoEstado}>
                        </TablaDeProductos>
                }
            </section>
        </Col>
    );
};

export default NuevoStockContainer
