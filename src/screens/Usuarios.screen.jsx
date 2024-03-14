import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InterfazDeIngresoDeUsuario from "../components/InterFazDeIngresoDeUsuario/InterfazDeIngresoDeUsuario";
import { wrapperNotificacionesServidor } from "../components/wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import SpinnerLoader from "../components/SpinnerLoader";

const UsuariosScreen = wrapperNotificacionesServidor(memo(
    ({
        loader,
        apiData,
        generatePromise
    }) => {

        const { usuarios = {} } = apiData

        const { data = [], tipo } = usuarios

        const n = useNavigate()

        const [usuarioLoggeado, setUsuarioLoggeado] = useState(false)

        useEffect(() => {
            if (usuarioLoggeado) {
                n("/stock")
            }
        }, [usuarioLoggeado])

        useEffect(() => {
            const promesa = {
                method: "GET",
                url: "usuarios",
                id: "usuarios",
            }
            generatePromise({ promesa })
        }, [])

        return (
            <main className="d-flex vh-100 ">
                {
                    !usuarioLoggeado || loader ?
                        <InterfazDeIngresoDeUsuario
                            setUsuarioLoggeado={setUsuarioLoggeado}
                            mostrar={true}
                            lista_de_usuarios={data}
                            usuarioLoggeado={usuarioLoggeado}
                            closeButtonOn={false}
                        /> :
                        <SpinnerLoader size="lg" position="centered" />
                }
            </main>

        );
    }))

export default UsuariosScreen