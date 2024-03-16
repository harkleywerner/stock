import { useCallback, useState } from "react";

export const useEstablecerParametros = (intial_state = {}) => {
    const [parametros, setParametros] = useState(intial_state)

    const insertarParametros = useCallback((params) => {
        setParametros(params)
    }, [])

    return {
        parametros,
        insertarParametros
    }

};