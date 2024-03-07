import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const logginSucursalHelper = ({
    generatePromise,
    tipo,
    loader,
    data,
    establecerInformacion,
    nombre
}) => {


    const cancelToken = axios.CancelToken.source()

    const nav = useNavigate()

    useEffect(() => {

        if (!loader && tipo == "success") {
            establecerInformacion({ sucursal_info: { id_sucursal: data.id_sucursal, nombre, loggeado: true } })
            nav("/usuarios")
        }

        return () => {
            if (cancelToken) {
                cancelToken.cancel()
            }
        }
    }, [loader])


    return () => {
        
        if(data.contraseña.length == 0) return

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