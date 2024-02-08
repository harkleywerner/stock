import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import shortUUID from "short-uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

export const usePromiseHandler = ({ listaDePromesas = [], establecerAlerta }) => {


    const [data, setData] = useState({});

    const [loader, setLoader] = useState(true);

    const id = useMemo(() => {
        return shortUUID.generate()
    }, [])


    const obtenerDatos = async ({ promesa, intentos } = {}) => {

        loader && setLoader(false)

        const actual = promesa || listaDePromesas

        try {
            const responses = await Promise.all(
                actual.map(({ method, url, data, cancelToken, params }) =>
                    axios({
                        method,
                        params: {
                            ...params
                        },
                        url: `${BACK_END_URL}${url}`,
                        data: {
                            ...data
                        },
                        cancelToken,
                    })
                )
            );

            setData(prev => {
                return responses.reduce((acc, response, index) => {

                    if (!Array.isArray(response?.data)) return { ...acc, [actual[index].id]: response?.data }

                    const id = actual[index].id;
                    return { ...acc, [id]: [...(acc[id] || []), ...response.data] };
                }, prev)
            })


            setLoader(true)


            return {
                rowAffected: responses.map(item => item.data.length),
                status: "success"
            }

        } catch (error) {
            const request = error?.request?.status ?? 200


            if (!intentos && [502, 503, 504, 500, 429, 500, 0, 400].includes(request)) {

                const res = error?.response?.data

                establecerAlerta({
                    id: id,
                    data: res || { message: error.message, code: error.code },
                    obtenerDatos: ({ intentos }) => obtenerDatos({ promesa: actual, intentos })
                })
            }
        }
    };

    const removerData = ({ id }) => {
        setLoader(false)
        setData(prev => {
            const copied = { ...prev }
            delete copied[id]
            return copied
        })
    }

    useEffect(() => {
        if (listaDePromesas.length > 0) {
            obtenerDatos();
        }

    }, []);

    return {
        data,
        loader,
        obtenerDatos,
        removerData
    }

}