import { createContext, useCallback, useState } from "react";
import { wrapperNotificacionesServidor } from "../../components/wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import sessionHelper from "./helpers/session.helper";
import SpinnerLoader from "@/components//SpinnerLoader";
import listaDeUsuariosHelper from "./helpers/listaDeUsuarios.helper";
import { memo } from "react";

export const informacionInicialContext = createContext()

export const InformacionInicialProvider = wrapperNotificacionesServidor(memo(({
    children,
    loader,
    generatePromise,
    apiData
}) => {
    const { usuarios = {}, session = {} } = apiData

    const { data = [] } = usuarios

    const [informacion, setInformacion] = useState({})

    const { sucursal_info = {}, usuario_info = {} } = informacion

    sessionHelper({ setInformacion, generatePromise, session }) //=> Su carga es unicamente al inicio recargar la page en cualquier lado.

    listaDeUsuariosHelper({ generatePromise, sucursal_info, data })

    const establecerInformacion = useCallback((nuevaInfo) => {
        setInformacion(prev => {
            return { ...prev, ...nuevaInfo }
        })
    }, [])


    return (
        <informacionInicialContext.Provider
            value={{
                sucursal_info,
                establecerInformacion,
                lista_de_usuarios: data,
                usuario_info
            }}>
            <div className="w-100 position-relative">
                {
                    loader ?  //=> solo se renderiza el children si esta la lista de usuarios.
                        <div
                            className="vh-100 d-flex">
                            <SpinnerLoader size="lg" position="centered" />
                        </div>
                        : children
                }
            </div>
        </informacionInicialContext.Provider>
    );
}))