import { establecerPendientes } from "@/store//reducer/gestionDeStock/gestionDeStock.slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

export const cambiosPendientesHelper = (
    {
        contador_de_cambios,
        cambios_pendientes
    }
) => {

    const { pathname } = useLocation()

    const dispatch = useDispatch()

    useEffect(() => { //=> Sirve para guardar los cambios en un store cuando se cambie de url

      
        return () => {
            if (contador_de_cambios != cambios_pendientes) {
                dispatch(establecerPendientes({ cambios_pendientes: contador_de_cambios }))
            }
        }

    }, [pathname])

}