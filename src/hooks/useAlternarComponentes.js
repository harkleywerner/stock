import { useCallback, useState } from "react";

export const useAlternarComponentes = () => {

    const [mostrar, setMostrar] = useState()

    const alternarMostrar = useCallback((estado) => {
        setMostrar(prev => estado == undefined || typeof estado == "object" ? !prev : estado)
    }, [])

    return {
        alternarMostrar,
        mostrar
    }

};