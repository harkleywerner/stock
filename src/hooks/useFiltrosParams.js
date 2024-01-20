import { useSearchParams } from "react-router-dom"
import pipe from "@/helpers/pipe"

export const useFiltrosParams = (state) => {

    const [search, setSearch] = useSearchParams()

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

    return pipe(filtradoPorCategoria, filtradoPorNombre)(state)

}
