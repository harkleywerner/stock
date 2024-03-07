import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InterfazDeIngresoDeUsuario from "../components/InterFazDeIngresoDeUsuario/InterfazDeIngresoDeUsuario";
import { informacionInicialContext } from "../provider/informacionInicialProvider/informacionInicial.provider";

const UsuariosScreen = () => {

    //Esta url solo esta permitida para las sucursales con loggeo en true.
    //El redireccionamiento se trabaja desde el back y el usePromiseHandler.

    const n = useNavigate()

    const { lista_de_usuarios, establecerInformacion } = useContext(informacionInicialContext)

    const [usuarioLoggeado, setUsuarioLoggeado] = useState()

    useEffect(() => {
        if (usuarioLoggeado) {
            establecerInformacion({ usuario_info: { ...usuarioLoggeado } })
            n("/stock")
        }
    }, [usuarioLoggeado])

    return (
        <>
            {
                !usuarioLoggeado && <InterfazDeIngresoDeUsuario
                    setUsuarioLoggeado={setUsuarioLoggeado}
                    mostrar={true}
                    lista_de_usuarios={lista_de_usuarios}
                    usuarioLoggeado={usuarioLoggeado}
                    closeButtonOn={false}
                />
            }
        </>
    );
};

export default UsuariosScreen