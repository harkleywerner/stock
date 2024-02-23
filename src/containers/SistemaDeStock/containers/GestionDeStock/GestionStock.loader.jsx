import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"
import { establecerStockInfo } from "@/store//reducer/gestionDeStock/gestionDeStock.slice"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const GestionStockLoader = memo(({
    children,
    apiData,
    loader,
    generatePromise
}) => {

    const { stock_info } = useSelector(state => state.gestion_stock)

    const dispatch = useDispatch()

    const { data } = apiData["stock/gestion"] || {}

    useEffect(() => {

        if (stock_info) return

        const consulta = { method: "GET", url: "stock/gestion", id: "stock/gestion" }

        generatePromise({ promesas: [consulta] })

    }, [stock_info])


    useEffect(() => {

        if (!data) return

        dispatch(establecerStockInfo(data))

    }, [data])


    return (
        <>
            {
                loader && !data || !stock_info ? <SpinnerLoader position="centered" /> : children
            }
        </>
    )

})

export default wrapperNotificacionesServidor(GestionStockLoader)