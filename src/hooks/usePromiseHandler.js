import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import shortUUID from "short-uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

export const usePromiseHandler = ({ establecerAlerta }) => {

    const [data, setData] = useState({});

    const [loader, setLoader] = useState(false);

    const id = useMemo(() => {
        return shortUUID.generate()
    }, [])


    const generatePromise = useCallback(async ({ promesas, intentos } = {}) => {

        setLoader(true)
        try {
            const responses = await axios.all(
                promesas.map(({ method, url, data = {}, cancelToken, params = {} }) =>
                    axios({
                        method,
                        params: {
                            ...params
                        },
                        url,
                        baseURL: BACK_END_URL,
                        data: {
                            ...data
                        },
                        cancelToken,
                    })
                )
            );



            setData(prev => {
                return responses.reduce((acc, response, index) => {

                    const id = promesas[index].id;
                    const concatenacion = promesas[index]?.concatenate //Esto por defecto es false, cuando es true indica que debe ingresar la nueva data con la anterior.

                    // if (!Array.isArray(response?.data)) return { ...acc, [id]: response?.data }


                    return { ...acc, [id]: concatenacion ? [...(acc[id] || []), ...response.data] : response.data };

                }, prev)
            })


            setLoader(false)


            return {
                // rowAffected: responses.map(item => item.data.length),
                status: "success"
            }

        } catch (error) {
            const request = error?.request?.status ?? 200

            if (intentos === undefined && [502, 503, 504, 500, 429, 500, 0, 400, 422].includes(request)) {
                const res = error?.response?.data

                establecerAlerta({
                    id: id,
                    data: res || { message: error.message, code: error.code },
                    method: error.config.method,
                    generatePromise: ({ intentos }) => generatePromise({ promesas, intentos })
                })
            }
        }
    }, [])

    const removerData = useCallback(({ id }) => {
        setLoader(true)
        setData(prev => {
            const copied = { ...prev }
            delete copied[id]
            return copied
        })
    }, [])


    return {
        data,
        loader,
        generatePromise,
        removerData
    }

}