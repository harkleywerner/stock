import { useEffect } from "react"

const listaDeUsuariosHelper = ({
    sucursal_info,
    generatePromise,
}) => {

    const { id_sucursal, loggeado } = sucursal_info


    const apiCall = () => {
        const promesa = {
            method: "GET",
            url: "stock/usuarios",
            id: "usuarios",
        }
        generatePromise({ promesa })
    }

    useEffect(() => {

        apiCall()

    }, [id_sucursal, loggeado]) //=> Si la id cambia se llama a lista de usuarios de esa sucursal.

}

export default listaDeUsuariosHelper