import { useState } from "react";

export const useAlerta = () => {
    const [alertas, setAlertas] = useState([])


    const establecerAlerta = (nuevaAlerta) => {

    
        setAlertas(prev => {
            const busqueda = prev.some(i => i.id == nuevaAlerta.id) ? prev : [...prev, { ...nuevaAlerta, intentos: 10 }]
            return busqueda
        })
    }

    const removerAlerta = (id) => {

        setAlertas(prev => {
            return prev.filter(i => i.id !== id)
        })
    }

    const establecerIntentos = (id) => {

        setAlertas(prev => {
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
        alertas: alertas[0],
        removerAlerta,
        establecerIntentos
    }


};