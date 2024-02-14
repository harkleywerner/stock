import { useState } from "react";

const analizarIntentos = ({ code, method }) => {
    if ([422, 400, 401,403,429].includes(code)) {
        return 0
    } else if (method == "get") {
        return 5
    }
}

export const useAlerta = () => {
    const [alertas, setAlertas] = useState([])

    const establecerAlerta = (nuevaAlerta) => {

        const { data, method } = nuevaAlerta

        const intentos = analizarIntentos({ method, code: data.code })

        setAlertas(prev => {
            const busqueda = prev.some(i => i.id == nuevaAlerta.id) ? prev : [...prev, { ...nuevaAlerta, intentos }]
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