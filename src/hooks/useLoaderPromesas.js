import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import shortUUID from "short-uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

export const useLoaderPromesas = ({ promesaInicial, establecerAlerta } = {}) => {

    const [data, setData] = useState([]);

    const [loader, setLoader] = useState(false);

    const id = useMemo(() => {
        return shortUUID.generate()
    }, [])


    const obtenerDatos = async ({ promesa, intentos } = {}) => {

        const actual = promesa || promesaInicial

        const { method, params, url, data, cancelToken } = actual

        loader && setLoader(false)

        try {
            const response = await axios({
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

            setData(prev => {
                return [...prev, ...response.data]
            })

            setLoader(true)

            return "success"

        } catch (error) {
            const request = error?.request?.status ?? 200

            if (!intentos && [502, 503, 504, 500, 429, 500, 0].includes(request)) {

                const res = error?.response?.data

                establecerAlerta({
                    id: id,
                    data: res || { message: error.message, code: error.code },
                    obtenerDatos: ({ intentos }) => obtenerDatos({ promesa: actual, intentos })
                })
            }

        }
    };


    useEffect(() => {
        obtenerDatos();
    }, []);

    return {
        data,
        loader,
        obtenerDatos,
        setLoader
    }

}