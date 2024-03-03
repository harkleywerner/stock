import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const logginSucursalHelper = ({
    generatePromise,
    tipo,
    loader,
    data,
}) => {

    const cancelToken = axios.CancelToken.source()

    const nav = useNavigate()

    useEffect(() => {

        if(!loader && tipo == "success"){
           nav("/stock")
        }

        return () => {
            if (cancelToken) {
                cancelToken.cancel()
            }
        }
    }, [loader])


    return () => {
        const promesa = {
            method: "POST",
            data,
            cancelToken: cancelToken.token,
            id: "loggin",
            url: "sucursales"

        }
        generatePromise({ promesa })
    }

}

export default logginSucursalHelper