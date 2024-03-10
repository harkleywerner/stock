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


    const apiCall = (reset) => {

        const promesa = {
            method: "POST",
            url: "stock",
            id: "stock/lote",
            concatenate: true,
            data: { offset: reset ?? data.length, id_producto, lote },
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

    }, [lote])

    return apiCall

};