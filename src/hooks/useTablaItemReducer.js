import { useCallback, useReducer } from "react"

const reducer = (state = [], action) => {

    const { tipo, productoItem } = action

    if (tipo == "INICIALIZAR") {
        return [...productoItem]
    }

    const { cantidad, id, categoria, nombre } = productoItem

    if (!state.find(item => item.id == id)) {
        return [...state, { ...productoItem }]
    }


    return state.map(item => {
        if (item.id !== id) return item

        switch (tipo) {
            case "AGREGAR":
                return {
                    ...item,
                    cantidad: cantidad
                }
            case "EDICION":

                return {
                    id: productoItem.idActual,
                    categoria,
                    nombre,
                    cantidad
                }
            case "REMOVER":
                return null

        }
    }).filter(item => item !== null)


}

export const useTablaItemReducer = () => {

    const [state, dispatch] = useReducer(reducer, [])

    const inicilizarState = (productoItem) => {
        dispatch({ tipo: "INICIALIZAR", productoItem })
    }

    const agregarItem = useCallback((productoItem) => {

        dispatch({ tipo: "AGREGAR", productoItem })
    }, [])

    const editarItem = useCallback((productoItem) => {
        dispatch({ tipo: "EDICION", productoItem })
    }, [])

    const removerItem = useCallback((productoItem) => {
        dispatch({ tipo: "REMOVER", productoItem })
    }, [])

    return {
        state,
        agregarItem,
        editarItem,
        removerItem,
        inicilizarState
    }

}

