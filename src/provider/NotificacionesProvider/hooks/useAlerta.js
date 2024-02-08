import { useCallback, useState } from "react";

export const useAlerta = () => {
    const [alerta, setAlerta] = useState([])


    const establecerAlerta = useCallback((nuevaAlerta) => {


        setAlerta(prev => {
            const busqueda = prev.some(i => i.id == nuevaAlerta.id) ? prev : [...prev, { ...nuevaAlerta, intentos: 10 }]
            return busqueda
        })
    }, [])

    const removerAlerta = useCallback((id) => {

        setAlerta(prev => {
            return prev.filter(i => i.id !== id)
        })
    }, [])

    const establecerIntentos = (id) => {

        setAlerta(prev => {
            return prev.map(i => {
                if (i.id == id) {
                    return { ...i, intentos: i.intentos - 1 }
                }
                return i
            })
        })
    }

    return {
        establecerAlerta,
        alerta: alerta[0],
        removerAlerta,
        establecerIntentos
    }


};