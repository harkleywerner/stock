import { useSearchParams } from "react-router-dom"
import { pipeUtils } from "@/utils/pipe.utils.js"



export const useFiltroProductosHook = (state) => { 
    //=> Sirve para cuando cargamos la tabla al 100% de la base de datos.
    //=> Se hace asi por cuestiones de diseño de la pagina,ya que debe verificar si el producto esta en la lista sin tener que llamar a la base de datos.

    const [search] = useSearchParams()

    const busqueda = search.get("search")

    const categoria = search.get("categoria")

    const filtradoPorCategoria = (estado) => {
        return estado.filter(item => {
            const verificarCategoria = !categoria ? item.categoria : categoria
            return item.categoria == verificarCategoria
        })

    }

    const filtradoPorNombre = (estado) => {

        return estado.filter(item => {

            const verificaBusqueda = busqueda ? busqueda : ""
            return item.nombre.toLowerCase().startsWith(verificaBusqueda.toLowerCase())
        })

    }

    return pipeUtils(filtradoPorCategoria, filtradoPorNombre)(state)

}
