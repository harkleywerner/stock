import { useCallback, useState } from "react";

export const useAlerta = () => {

    const [alertas, setAlerta] = useState([])

    const removerAlertas = useCallback(() => {
        setAlerta([])
    }, [])

    const establercerAlerta = useCallback((nuevaAlerta) => {

        const { multiples, id } = nuevaAlerta //=> id,multiples,texto,tipo

        return new Promise((res) => {
            setAlerta(prev => {

                if (prev.length >= 5) {
                    res()
                    const nuevoPrev = [...prev]
                    nuevoPrev.splice(0, 1)
                    nuevoPrev.splice(prev.length - 1, 0, nuevaAlerta)
                    return nuevoPrev
                }

                const findIndex = multiples ? -1 : prev.findIndex(item => item.id == id)
                const filtrado = multiples ? prev : prev.filter(item => item.id !== id)
                res({ indice: findIndex })
                return [...filtrado, { ...nuevaAlerta }]
            })
        })
            .then(({ indice }) => {
                if (indice == -1) {
                    setTimeout(() => {
                        setAlerta(prev => {

                            return prev.slice(1)
                        })
                    }, 5000);
                }
            })
    }, [])


    return {
        alertas,
        establercerAlerta,
        removerAlertas
    }
};
