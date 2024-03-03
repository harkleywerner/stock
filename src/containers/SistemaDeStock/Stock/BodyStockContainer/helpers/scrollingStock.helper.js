import axios from "axios";
import { useEffect } from "react";

const scrollingStockHelper = ({
    generatePromise,
    dataLength,
    removerApiData,
    getSearch
}) => {

    const cancelSource = axios.CancelToken.source()

    const apiCall = (reset) => {
        const promesa =
        {
            method: "GET", url: `/stock`, id: "stock",
            params: { search: getSearch, offset: reset ?? dataLength },
            cancelToken: cancelSource.token,
            concatenate: true
        }

        generatePromise({ promesa })
    }

    useEffect(() => {

        removerApiData({ id: "stock" })

        const timeOut = setTimeout(() => {

            apiCall(0)

        }, 600);

        return () => {
            clearTimeout(timeOut)
            cancelSource.cancel()
        }

    }, [getSearch])


    return apiCall

};


export default scrollingStockHelper