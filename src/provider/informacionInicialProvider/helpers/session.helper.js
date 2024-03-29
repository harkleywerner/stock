import { useEffect } from "react";

const sessionHelper = ({
    generatePromise,
}) => {

    const apiCall = () => {
        const promesa = {
            method: "GET",
            url: "session",
            id: "session",
        }
        generatePromise({ promesa })
    }

    useEffect(() => {
        apiCall()
    }, [])
};

export default sessionHelper