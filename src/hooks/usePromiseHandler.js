import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import shortUUID from "short-uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

export const usePromiseHandler = ({ establecerAlerta }) => {

    const nav = useNavigate()

    const [apiData, setApiData] = useState({});

    const [loader, setLoader] = useState(false);

    const shortId = useMemo(() => {
        return shortUUID.generate()
    }, [])

    const establecerApiData = ({ response, promesa }) => {

        const { concatenate, id } = promesa

        setApiData(prev => {

            const idActual = prev[id]

            const { data = [] } = response?.data //=> Esto es la data total que llega desde el back.

            const nuevaData = concatenate ? [...(idActual?.data || []), ...data] : data

            return { ...prev, [id]: { ...(response?.data || {}), data: nuevaData } };
        })
    }

    const generatePromise = useCallback(

        async ({ promesa, intentos } = {}) => {

            setLoader(true)

            const { method, url, data = {}, cancelToken, params = {}, cocatenate, id } = promesa

            try {

                const response = await
                    axios({
                        url,
                        method,
                        data,
                        cancelToken,
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

                const request = error?.request?.status ?? 200

                if (intentos === undefined && [502, 503, 504, 500, 429, 500, 0, 400, 422, 404].includes(request)) {
                    
                    const res = error?.response?.data

                    establecerAlerta({
                        id: shortId,
                        data: res || { message: error.message, code: error.code },
                        url: error.config.url,
                        method: error.config.method,
                        generatePromise: ({ intentos }) => generatePromise({ promesa, intentos })
                    })
                }

                setLoader(false)

                const redirect = error?.response?.data?.redirect

                if (redirect) {
                    nav(`/${redirect}`)
                }

                return {
                    status: "failed"
                }
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