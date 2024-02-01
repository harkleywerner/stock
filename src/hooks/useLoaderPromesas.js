import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import shortUUID from "short-uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;


export const useLoaderPromesas = ({ listaDePromesas, establecerAlerta }) => {

    const [data, setData] = useState({});

    const [loader, setLoader] = useState(false);

    const id = useMemo(()=>{
        return shortUUID.generate()
    },[])


    const obtenerDatos = async ({ promesa, intentos } = {}) => {

        const actual = promesa || listaDePromesas

        try {
            const responses = await Promise.all(
                actual.map(({ method, url, data }) =>
                    axios({
                        method,
                        url: `${BACK_END_URL}${url}`,
                        data,
                    })
                )
            );

            const newData = responses.reduce((acc, response, index) => {
                acc[actual[index].id] = response.data;
                return acc;
            }, {});


            setData(prev => { //=> En casos donde tenga donde cambie las query, se reemplaza por el anterior propiedad del mismo id
                return { ...prev, ...newData }
            });

            setLoader(true)

            return "success"

        } catch (error) {

            if (!intentos && [502, 503, 504, 500, 429, 500, 0].includes(error.request.status)) {

                const res = error?.response?.data

                establecerAlerta({
                    id: id,
                    data: res || { message: error.message, code: error.code },
                    obtenerDatos

                })
            }



        }
    };

    useEffect(() => {
        setLoader(false);
        obtenerDatos();
    }, []);


    return {
        data,
        loader,
        obtenerDatos
    }
}