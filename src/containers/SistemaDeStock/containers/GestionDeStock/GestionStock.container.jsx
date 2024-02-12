import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { addProducto, deleteProducto, editProducto, inicilizarStock } from "@/redux//slice/gestionDeStock/gestionDeStock.slice";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import TablaDeProductos from "../components/ContenedorDeTabla/TablaDeProductos";
import { Col } from "react-bootstrap";
import SpinnerLoader from "@/components//SpinnerLoader";
import { useFiltroProductos } from "../hooks/useFiltroProductos";

const Tabla = memo(({ stock }) => {

    const nuevoEstado = useFiltroProductos(stock)

    return (
        <section className="d-flex h-100 overflow-hidden">
            {
                nuevoEstado.length > 0 ? <TablaDeProductos
                    stock={nuevoEstado}
                    addProducto={addProducto}
                    deleteProducto={deleteProducto}
                    editProducto={editProducto}
                /> : <p className="text-white fs-5 m-auto text-center">No se encontraron  elementos en la tabla</p>
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
        <Col className="p-0 d-flex justify-content-center">
            {
                loader ? <SpinnerLoader /> : <Tabla stock={stock} />
            }
        </Col>
    )
}))

export default GestionStockContainer

