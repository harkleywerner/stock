import axios from "axios";
import { useEffect } from "react";

const sessionHelper = ({
    setInformacion,
    generatePromise,
    session
}) => {
    const cancelToken = axios.CancelToken.source()

    const { data = {},tipo } = session || {}

    const apiCall = () => {
        const promesa = {
            method: "GET",
            url: "session",
            id: "session",
            cancelToken: cancelToken.token,
        }
        generatePromise({ promesa })
    }

    useEffect(() => {
         if(tipo == "success"){
            setInformacion({ ...data })
         }
       
    }, [JSON.stringify(data)])

    useEffect(() => {
        apiCall()
        return () => {
            cancelToken.cancel()
        }
    }, [])
};

export default sessionHelper