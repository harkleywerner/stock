import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DatosInicialesContext = createContext()

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL

export const DatosInicialesProvider = ({ children }) => {

    const [data, setData] = useState({})

    useEffect(() => {
        (async () => {
            const categorias = await axios.get(`${BACK_END_URL}/productos/categorias`)
            const usuarios = await axios.get(`${BACK_END_URL}/usuarios`)
            setData({
                categorias,
                usuarios
            })
        })()
    }, [])

    return (
        <DatosInicialesContext.Provider value={{}}>
            {children}
        </DatosInicialesContext.Provider>
    );
}