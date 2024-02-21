import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"
import { establecerStockInfo } from "@/store//reducer/gestionDeStock/gestionDeStock.slice"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const GestionStockLoader = memo(({
    children,
    data,
    loader,
    generatePromise
}) => {

    const { stock_info } = useSelector(state => state.gestion_stock)

    const dispatch = useDispatch()

    const stock = data["stock/gestion"]

    useEffect(() => {


        if (stock_info) return

        const consulta = { method: "GET", url: "stock/gestion", id: "stock/gestion" }

        generatePromise({ promesas: [consulta] })

    }, [stock_info])

    useEffect(() => {

        if (!stock) return

        dispatch(establecerStockInfo(stock[0]))

    }, [stock])

    return (
        <>
            {
                loader && !stock || !stock_info ? <SpinnerLoader position="centered" /> : children
            }
        </>
    )

})

export default wrapperNotificacionesServidor(GestionStockLoader)