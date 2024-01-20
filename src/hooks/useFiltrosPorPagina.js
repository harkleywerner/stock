import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFiltrosPorPagina = () => {

    const [page, setPage] = useState(1)

    const [search, setSearch] = useSearchParams()

    const categoria = search.get("categoria")
    const buscador = search.get("search")

    const dependencias = [categoria, buscador]

    const filtradoPorPage = (estado) => {
        const n = page * 15
        return estado.slice(Math.abs(15 - n), n)
    }


    useEffect(() => {
     
        if (dependencias.some(i => i !== undefined && page > 1)) {
            setPage(1)
        }

    }, [...dependencias])
         

    const establecerPaginacion = (n) => {
        if (page <= 1 && n == -1) return
        setPage(page + n)
    }

    return {
        establecerPaginacion,
        filtradoPorPage,
        page
    }
};