import { useEffect } from "react";

const sessionHelper = ({
    setInformacion,
    generatePromise,
    session
}) => {

    const { data = {},tipo } = session || {}

    const apiCall = () => {
        const promesa = {
            method: "GET",
            url: "session",
            id: "session",
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
    }, [])
};

export default sessionHelper