import axios from "axios";
import { useEffect } from "react";

export const scrollingHelper = (
    {
        generatePromise,
        removerApiData,
        data,
        lote,
        id_producto
    }
) => {

    const cancelToken = axios.CancelToken.source()

    const apiCall = (reset) => {

        const promesa = {
            method: "POST",
            url: "stock",
            id: "stock/lote",
            concatenate: true,
            data: { offset: reset ?? data.length, id_producto, lote },
            cancelToken: cancelToken.token,
        }

        generatePromise({ promesa })
    }

    useEffect(() => {

        if (data.length > 0) {
            removerApiData({ id: "stock/lote" })
        }

        const timeOut = setTimeout(() => {
            apiCall(0)
        }, 300);

        return () => {
            clearTimeout(timeOut)
            cancelToken.cancel()
        }
    }, [lote])

    return apiCall

};