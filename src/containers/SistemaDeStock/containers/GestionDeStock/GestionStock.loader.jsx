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

    const cancelToken = axios.CancelToken.source()

    useEffect(() => {

        if (stock_info) return

        const promesa = { method: "GET", url: "stock/gestion", id: "stock/gestion", cancelToken: cancelToken.token }

        generatePromise({ promesa })

        return () => {
            cancelToken.cancel()
        }

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