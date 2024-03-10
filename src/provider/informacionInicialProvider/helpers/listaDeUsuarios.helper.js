import { useEffect } from "react"

const listaDeUsuariosHelper = ({
    sucursal_info,
    generatePromise,
    data
}) => {

    const { id_sucursal, loggeado } = sucursal_info

    const verificarIdData = data.some(i => i.id_sucursal == id_sucursal)

    const apiCall = () => {
        const promesa = {
            method: "GET",
            url: "stock/usuarios",
            id: "usuarios",
        }
        generatePromise({ promesa })
    }

    useEffect(() => {

        if (
            id_sucursal == undefined ||
            !loggeado ||
            verificarIdData
        ) return

        apiCall()

    }, [id_sucursal, loggeado]) //=> Si la id cambia se llama a lista de usuarios de esa sucursal.

}

export default listaDeUsuariosHelper