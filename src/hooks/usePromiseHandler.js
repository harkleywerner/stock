import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import shortUUID from "short-uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

export const usePromiseHandler = ({ establecerAlerta }) => {

    const [apiData, setApiData] = useState({});

    const [loader, setLoader] = useState(false);

    const id = useMemo(() => {
        return shortUUID.generate()
    }, [])


    const generatePromise = useCallback(
        async ({ promesa, intentos } = {}) => {

            setLoader(true)

            const { method, url, data = {}, cancelToken, params = {}, cocatenate } = promesa

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

                    console.log(response)

                setApiData(prev => {

                    const idActual = prev[promesa.id]

                    const concatenacion = promesa?.concatenate //=> Sirve para indicar si quiero concatenar la data anterior con la nueva

                    const { data = [] } = response.data //=> Esto es la data total que llega desde el back.

                    const nuevaData = concatenacion ? [...(idActual?.data || []), ...data] : data

                    return { ...prev, [promesa.id]: { ...response.data, data: nuevaData } };
                })

                setLoader(false)

                return {
                    status: "success"
                }

            } catch (error) {

                const request = error?.request?.status ?? 200

                if (intentos === undefined && [502, 503, 504, 500, 429, 500, 0, 400, 422, 404].includes(request)) {
                    const res = error?.response?.data
                    establecerAlerta({
                        id: id,
                        data: res || { message: error.message, code: error.code },
                        url: error.config.url,
                        method: error.config.method,
                        generatePromise: ({ intentos }) => generatePromise({ promesa, intentos })
                    })
                }

                setLoader(false)
                
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