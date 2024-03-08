import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const analizarIntentos = ({ code, method, not_retry }) => {

    if (!not_retry && code >= 500 || code == "ERR_NETWORK" || method == "get") {
        return 5
    } else {
        return 0
    }
}

export const useAlerta = () => {
    const [alertas, setAlertas] = useState([])

    const establecerAlerta = (nuevaAlerta) => {

        const { data = {}, not_retry } = nuevaAlerta

        const { code, method } = data
        const intentos_iniciales = analizarIntentos({ code, method, not_retry })

        setAlertas(prev => {
            const busqueda = prev.some(i => i.id == nuevaAlerta.id) ? prev : [...prev, { ...nuevaAlerta, intentos_iniciales }]
            return busqueda
        })
    }

    const removerAlerta = useCallback((id) => {
        setAlertas(prev => {
            return prev.filter(i => i.id !== id)
        })
    },[])

    const { pathname } = useLocation()

    useEffect(() => {
        setAlertas([])
    }, [pathname])

    return {
        establecerAlerta,
        alertas,
        removerAlerta,
    }


};
