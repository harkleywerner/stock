import SpinnerLoader from "@/components//SpinnerLoader"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor"
import { establecerStockInfo } from "@/store//reducer/gestionDeStock/gestionDeStock.slice"
import axios from "axios"
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

        if (stock_info?.id_stock) return

        const promesa = { method: "GET", url: "stock/gestion", id: "stock/gestion" }

        generatePromise({ promesa })

    }, [stock_info])

    useEffect(() => {
        
        if (!data ) return

        dispatch(establecerStockInfo(data))

    }, [data, stock_info?.id_stock])


    return (
        <>
            {
                loader && !data || !stock_info ? <SpinnerLoader position="centered" /> : children
            }
        </>
    )

})

export default wrapperNotificacionesServidor(GestionStockLoader)