import SpinnerLoader from "@/components//SpinnerLoader";
import { createContext, memo } from "react";
import { wrapperNotificacionesServidor } from "../../components/wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { listaDeCategoriasHelper } from "./helpers/listaDeCategorias.helper";
import listaDeUsuariosHelper from "./helpers/listaDeUsuarios.helper";
import sessionHelper from "./helpers/session.helper";

export const informacionInicialContext = createContext()

export const InformacionInicialProvider = wrapperNotificacionesServidor(memo(({//Se cargan valores que no cambian con el tiempo.
    children,
    loader,
    generatePromise,
    apiData
}) => {

    const { usuarios = {}, session = {}, categorias = {} } = apiData

    const { sucursal_info = {}, usuario_info = {} } = session?.data || {}

    const usuariosData = usuarios?.data || []

    const categoriasData = categorias?.data || []

    sessionHelper({ generatePromise })

    listaDeUsuariosHelper({ generatePromise, sucursal_info })

    listaDeCategoriasHelper({ generatePromise, usuario_info })


    return (
        <informacionInicialContext.Provider
            value={{
                usuario_info,
                sucursal_info,
                lista_de_usuarios: usuariosData,
                lista_de_categorias: categoriasData,
            }}>
            <div className="w-100 position-relative">
                {
                    loader ?
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