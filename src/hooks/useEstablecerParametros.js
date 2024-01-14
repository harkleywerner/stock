import { useCallback, useState } from "react";

export const useEstablecerParametros = () => {
    const [parametros, setParametros] = useState({})

    const insertarParametros = useCallback((params) => {
        setParametros(params)
    }, [])

    return {
        parametros,
        insertarParametros
    }

};