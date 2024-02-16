import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"
import { establecerStockInfo } from "@/store//reducer/gestionDeStock/gestionDeStock.slice"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

const GestionStockLoader = memo(({
    children,
    data,
    loader,
    generatePromise
}) => {

    const { stock_info } = useSelector(state => state.gestion_stock)

    const dispatch = useDispatch()

    const [search] = useSearchParams()

    const id_stock = search.get("id_stock")

    const stock = data["stock/gestion"] || []

    useEffect(() => {

        if (stock_info || stock_info?.id_stock === id_stock) return

        const consulta = { method: "GET", url: "stock/gestion", id: "stock/gestion", params: { id_stock } }

        generatePromise({ promesas: [consulta] })

    }, [])

    useEffect(() => {

        if (stock.length == 0 || stock_info?.id_stock === id_stock) return

        dispatch(establecerStockInfo(stock[0]))

    }, [stock])

    return (
        <>
            {
                loader || stock.length == 0 || !stock_info ? <SpinnerLoader position="centered" /> : children
            }
        </>
    )

})

export default wrapperNotificacionesServidor(GestionStockLoader)