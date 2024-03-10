import { useEffect } from "react";

export const scrollProductosHelper = ({
    generatePromise,
    getBuscador,
    getCategoria,
    removerApiData,
    dataLength
}) => {

    const apiCall = (reset) => {

        const promesa =
        {
            method: "GET", url: `/stock/productos`, id: "productos",
            params: { search: getBuscador, categoria: getCategoria, offset: reset ?? dataLength },
            concatenate: true
        }

        generatePromise({ promesa })
    }

    useEffect(() => {

        removerApiData({ id: "productos" })

        const timeOut = setTimeout(() => {
            apiCall(0)

        }, 600);

        return () => {
            clearTimeout(timeOut)
        }

    }, [getBuscador, getCategoria])

    return apiCall

};