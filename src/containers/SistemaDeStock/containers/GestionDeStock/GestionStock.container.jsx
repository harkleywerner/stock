import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablaDeProductos from "../components/ContenedorDeTabla/TablaDeProductos";
import { Col } from "react-bootstrap";
import SpinnerLoader from "@/components//SpinnerLoader";
import { addProducto, deleteProducto, editProducto, inicilizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { useFiltroProductosHook } from "../hooks/useFiltroTablas.hook";
import axios from "axios";


const Message = memo(() => (
    <p className="text-white h-100  d-flex justify-content-center align-items-center  fs-5 m-auto text-center">No se encontraron  productos en la tabla...</p>
))

const Tabla = memo(({ stock, inicializado }) => {

    const nuevoEstado = useFiltroProductosHook(stock)
    return (
        <section className="scrollbar h-100">
            {
                nuevoEstado.length > 0 ? <TablaDeProductos
                    stock={nuevoEstado}
                    inicializado={inicializado}
                    addProducto={addProducto}
                    deleteProducto={deleteProducto}
                    editProducto={editProducto}
                /> : <Message />
            }
        </section>
    )
})


const GestionStockContainer = memo(({
    apiData,
    loader,
    generatePromise
}) => {

    const dispatch = useDispatch()

    const { stock, inicializado, stock_info } = useSelector(state => state.gestion_stock)

    const { data } = apiData["detalleStock"] || {}

    const cancelToken = axios.CancelToken.source()

    const promesa = 
        {
            method: "GET", url: "stock/detalleDeStock", id: "detalleStock", params: { id_stock: stock_info.id_stock },
            cancelToken : cancelToken.token
        }


    useEffect(() => {
        if (!inicializado) {
            generatePromise({ promesa})
        }
        return () => {
            cancelToken.cancel()
        }
    }, [stock])

    useEffect(() => {

        if (!inicializado && data) {

            dispatch(inicilizarStock(data))
        }
    }, [data])


    return (
        <Col className="p-0 d-flex h-100 justify-content-center">
            {
                loader || !inicializado && stock.length == 0 ?
                    <SpinnerLoader position="centered" /> :
                    <Tabla stock={stock} inicializado={inicializado} />
            }
        </Col>
    )
})


export default wrapperNotificacionesServidor(GestionStockContainer)