import { useEffect } from "react";

export const listaDeCategoriasHelper = ({
    generatePromise,
}) => {

    const apiCall = () => {

        const promesa = {
            method: "GET",
            url: "stock/productos/categorias",
            id: "categorias"
        }

        generatePromise({ promesa })
    }

    useEffect(() => {
        apiCall()
    }, [])


};