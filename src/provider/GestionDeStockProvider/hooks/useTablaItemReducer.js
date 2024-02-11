import { useCallback, useReducer } from "react"

const reducer = (state = [], action) => {

    const { tipo, productoItem } = action


    if (tipo == "INICIALIZAR") {
        return [...productoItem]
    } else if (tipo == "REINICIAR") {
        return []
    }


    const { cantidad, id_producto, categoria, nombre } = productoItem

    if (!state.some(item => item.id_producto == id_producto)) {
        return [...state, { ...productoItem }]
    }

    return state.map(item => {
        if (item.id_producto !== id_producto) return item

        switch (tipo) {
            case "AGREGAR":
                return {
                    ...item,
                    cantidad: cantidad
                }
            case "EDICION":

                return {
                    id_producto: productoItem.id_actual,
                    categoria,
                    nombre,
                    cantidad,
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

    const reinicarLista = useCallback(() => {
        dispatch({ tipo: "REINICIAR" })
    }, [])

    return {
        state,
        agregarItem,
        editarItem,
        removerItem,
        inicilizarState,
        reinicarLista
    }

}

