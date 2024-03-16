import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catchPromiseHandler } from "./catch";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

export const usePromiseHandler = ({ establecerAlerta, shortId,cancelToken }) => {
    const nav = useNavigate()

    const [apiData, setApiData] = useState({});

    const [loader, setLoader] = useState(false);



    const establecerApiData = ({ response, promesa }) => {

        const { concatenate, id } = promesa

        setApiData(prev => {

            const idActual = prev[id]

            const { data = [] } = response?.data || {} //=> Esto es la data total que llega desde el back.

            const nuevaData = concatenate ? [...(idActual?.data || []), ...data] : data

            return { ...prev, [id]: { ...(response?.data || {}), data: nuevaData } };
        })
    }

    const generatePromise = useCallback(

        async ({ promesa, intentos } = {}) => {

            setLoader(true)

            const { method, url, data = {}, params = {}, cocatenate, id } = promesa

            try {

                const response = await
                    axios({
                        url,
                        method,
                        data,
                        cancelToken: cancelToken.token,
                        params,
                        baseURL: BACK_END_URL,
                        withCredentials: true
                    });

                establecerApiData({ promesa, response })

                setLoader(false)

                return {
                    status: "success"
                }

            } catch (error) {

                return catchPromiseHandler({
                    error,
                    intentos,
                    generatePromise,
                    setLoader,
                    establecerApiData,
                    nav,
                    shortId,
                    promesa,
                    establecerAlerta
                })

            }
        }, [])

    const removerApiData = useCallback(({ id }) => {
        setLoader(true)
        setApiData(prev => {
            const copied = { ...prev }
            delete copied[id]
            return copied
        })
    }, [])


    return {
        apiData,
        loader,
        generatePromise,
        removerApiData
    }

}