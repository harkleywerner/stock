import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import TablaDeProductos from "../components/ContenedorDeTabla/TablaDeProductos";
import { Col } from "react-bootstrap";
import SpinnerLoader from "@/components//SpinnerLoader";
import { useFiltroProductos } from "../hooks/useFiltroProductos";
import { addProducto, deleteProducto, editProducto, inicilizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";


const Message = memo(() => (
    <p className="text-white h-100  d-flex justify-content-center align-items-center  fs-5 m-auto text-center">No se encontraron  productos en la tabla...</p>
))

const Tabla = memo(({ stock,inicializado }) => {

    const nuevoEstado = useFiltroProductos(stock)
    return (
        <section className="scrollbar h-100">
            {
                nuevoEstado.length > 0 ? <TablaDeProductos
                    stock={nuevoEstado}
                    inicializado = {inicializado}
                    addProducto={addProducto}
                    deleteProducto={deleteProducto}
                    editProducto={editProducto}
                /> : <Message />
            }
        </section>
    )
})


const GestionStockContainer = wrapperNotificacionesServidor(memo(({ data, loader, generatePromise }) => {

    const dispatch = useDispatch()

    const { stock, inicializado } = useSelector(state => state.gestion_stock)

    const [search] = useSearchParams()

    const getStock = search.get("stock")

    const verificarStock = getStock ? "/detalleDeStock" : "/detalleDeStock/ultimo"

    const detalleStock = data["detalleStock"] || []

    const listaDePromesas = [
        {
            method: "GET", url: verificarStock, id: "detalleStock",
        }
    ]

    useEffect(() => {
        if (!inicializado) {
            generatePromise({ promesas: listaDePromesas })
        }
    }, [stock])

    useEffect(() => {
        if (!inicializado && stock.length == 0 && detalleStock.length > 0) {
            dispatch(inicilizarStock(detalleStock))
        }
    }, [JSON.stringify(detalleStock), inicializado, stock])

    return (
        <Col className="p-0 d-flex h-100 justify-content-center">
            {
                loader && stock.length == 0 || !inicializado && stock.length == 0 ?
                    <SpinnerLoader /> :
                    <Tabla stock={stock} inicializado={inicializado} />
            }
        </Col>
    )
}))

export default GestionStockContainer

