import { createContext, useEffect } from "react";
import { useTablaItemReducer } from "../hooks/useTablaItemReducer";


const listado2 = [
    { nombre: "Dulce de leche con nuez", categoria: "dulce de leche", id: 8, cantidad: 1 },
    { nombre: "Dulce de leche granizado", categoria: "dulce de leche", id: 2 },
    { nombre: "Vainilla", categoria: "cremas", id: 3 },
    { nombre: "Banana split", categoria: "cremas", id: 4 },
    { nombre: "Frutilla a la crema", categoria: "cremas", id: 5 },
    { nombre: "Choco shot", categoria: "chocolate", id: 6 },
    { nombre: "Chocotorta", categoria: "tortas", id: 7 },
    { nombre: "Dulce de leche con nuez", categoria: "dulce de leche", id: 8, cantidad: 1 },
    { nombre: "Dulce de leche granizado", categoria: "dulce de leche", id: 2 },
    { nombre: "Vainilla", categoria: "cremas", id: 3 },
    { nombre: "Banana split", categoria: "cremas", id: 4 },
    { nombre: "Frutilla a la crema", categoria: "cremas", id: 5 },
    { nombre: "Choco shot", categoria: "chocolate", id: 6 },
    { nombre: "Chocotorta", categoria: "tortas", id: 7 },
    { nombre: "Dulce de leche con nuez", categoria: "dulce de leche", id: 8, cantidad: 1 },
    { nombre: "Dulce de leche granizado", categoria: "dulce de leche", id: 2 },
    { nombre: "Vainilla", categoria: "cremas", id: 3 },
    { nombre: "Banana split", categoria: "cremas", id: 4 },
    { nombre: "Frutilla a la crema", categoria: "cremas", id: 5 },
    { nombre: "Choco shot", categoria: "chocolate", id: 6 },
    { nombre: "Chocotorta", categoria: "tortas", id: 7 },
    { nombre: "Dulce de leche con nuez", categoria: "dulce de leche", id: 8, cantidad: 1 },
    { nombre: "Dulce de leche granizado", categoria: "dulce de leche", id: 2 },
    { nombre: "Vainilla", categoria: "cremas", id: 3 },
    { nombre: "Banana split", categoria: "cremas", id: 4 },
    { nombre: "Frutilla a la crema", categoria: "cremas", id: 5 },
    { nombre: "Choco shot", categoria: "chocolate", id: 6 },
    { nombre: "Chocotorta", categoria: "tortas", id: 7 },
    { nombre: "Dulce de leche con nuez", categoria: "dulce de leche", id: 8, cantidad: 1 },
    { nombre: "Dulce de leche granizado", categoria: "dulce de leche", id: 2 },
    { nombre: "Vainilla", categoria: "cremas", id: 3 },
    { nombre: "Banana split", categoria: "cremas", id: 4 },
    { nombre: "Frutilla a la crema", categoria: "cremas", id: 5 },
    { nombre: "Choco shot", categoria: "chocolate", id: 6 },
    { nombre: "Chocotortaffffffffffff", categoria: "tortas", id: 7 },
]


export const nuevoStockContext = createContext()

export const NuevoStockProvider = ({ children }) => {

    const dataB = [...listado2]

    const nuevaTabla = useTablaItemReducer()


    const ultimaTabla = useTablaItemReducer()


    useEffect(() => {

        ultimaTabla.inicilizarState(dataB)

    }, [JSON.stringify(dataB)])



    return (
        <nuevoStockContext.Provider value={{ nuevaTabla, ultimaTabla }}>
            {
                children
            }
        </nuevoStockContext.Provider>

    )
};
