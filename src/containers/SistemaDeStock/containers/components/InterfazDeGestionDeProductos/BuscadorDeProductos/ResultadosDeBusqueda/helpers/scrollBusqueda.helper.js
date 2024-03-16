import { useEffect } from "react";

export const scrollBusquedaHelper = (
    {
        buscador,
        categoria,
        generatePromise,
        removerApiData,
        data,
        listaDeIds
    }
) => {

    const apiCall = (reset) => {
        const promesa =
        {
            method: "POST",
            url: `stock/productos`,
            id: "productos",
            data: { buscador, categoria, offset: reset ?? data.length, listaDeIds : listaDeIds.join(",") },
            concatenate: true,
        }
        generatePromise({ promesa })
    }

    useEffect(() => {

        removerApiData({ id: "productos" })

        const timeoutSearch = setTimeout(() => {

            apiCall(0)

        }, 600);

        return () => {
            clearTimeout(timeoutSearch)
        }
    }, [buscador, categoria])


    return apiCall

};