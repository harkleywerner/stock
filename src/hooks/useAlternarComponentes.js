import { useCallback, useState } from "react";

export const useAlternarComponentes = () => {

    const [mostrar, setMostrar] = useState()

    const alternarMostrar = useCallback(() => {
        setMostrar(prev => !prev)
    }, [])

    return {
        alternarMostrar,
        mostrar
    }

};