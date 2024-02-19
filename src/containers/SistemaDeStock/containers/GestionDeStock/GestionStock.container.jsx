import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablaDeProductos from "../components/ContenedorDeTabla/TablaDeProductos";
import { Col } from "react-bootstrap";
import SpinnerLoader from "@/components//SpinnerLoader";
import { useFiltroProductos } from "../hooks/useFiltroProductos";
import { addProducto, deleteProducto, editProducto, inicilizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";


const Message = memo(() => (
    <p className="text-white h-100  d-flex justify-content-center align-items-center  fs-5 m-auto text-center">No se encontraron  productos en la tabla...</p>
))

const Tabla = memo(({ stock, inicializado }) => {

    const nuevoEstado = useFiltroProductos(stock)
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


const GestionStockContainer = wrapperNotificacionesServidor(memo(({
    data,
    loader,
    generatePromise
}) => {

    const dispatch = useDispatch()

    const { stock, inicializado, stock_info } = useSelector(state => state.gestion_stock)

    const { detalleStock } = data

    const listaDePromesas = [
        {
            method: "GET", url: "detalleDeStock", id: "detalleStock", params: { id_stock: stock_info.id_stock },
        }
    ]


    useEffect(() => {
        if (!inicializado) {
            generatePromise({ promesas: listaDePromesas })
        }
    }, [stock])

    useEffect(() => {

        if (!inicializado && detalleStock) {

            dispatch(inicilizarStock(detalleStock))
        }
    }, [detalleStock])


    return (
        <Col className="p-0 d-flex h-100 justify-content-center">
            {
                loader || !inicializado && stock.length == 0 ?
                    <SpinnerLoader position="centered" /> :
                    <Tabla stock={stock} inicializado={inicializado} />
            }
        </Col>
    )
}))


export default GestionStockContainer