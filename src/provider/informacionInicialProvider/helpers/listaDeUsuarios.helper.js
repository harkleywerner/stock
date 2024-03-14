import { useEffect } from "react"

const listaDeUsuariosHelper = ({
    sucursal_info = {},
    generatePromise,
}) => {
    const { loggeado } = sucursal_info

    const apiCall = () => {
        const promesa = {
            method: "GET",
            url: "usuarios",
            id: "usuarios",
        }
        generatePromise({ promesa })
    }


    useEffect(() => {

        if (!loggeado) return

        apiCall()

    }, [loggeado]) //=> Si la id cambia se llama a lista de usuarios de esa sucursal.

}

export default listaDeUsuariosHelper