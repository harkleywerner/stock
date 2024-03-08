import axios from "axios";
import { useEffect } from "react";

export const scrollProductosHelper = ({
    generatePromise,
    getBuscador,
    getCategoria,
    removerApiData,
    dataLength
}) => {

    const cancelSource = axios.CancelToken.source()

    const apiCall = (reset) => {

        const promesa =
        {
            method: "GET", url: `/stock/productos`, id: "productos",
            params: { search: getBuscador, categoria: getCategoria, offset: reset ?? dataLength },
            cancelToken: cancelSource.token,
            concatenate: true
        }

        generatePromise({ promesa: promesa })
    }

    useEffect(() => {

        removerApiData({ id: "productos" })

        const timeOut = setTimeout(() => {
            apiCall(0)

        }, 600);

        return () => {
            clearTimeout(timeOut)
            cancelSource.cancel()
        }

    }, [getBuscador, getCategoria])

    return apiCall

};