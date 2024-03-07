import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";
import { lazy, useContext, useState } from "react";
import { Button } from "react-bootstrap";

const InterfazDeIngresoDeUsuario = lazy(() => import("@/components//InterFazDeIngresoDeUsuario/InterfazDeIngresoDeUsuario"))

export const ListaDeUsuarios = (() => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { lista_de_usuarios, usuario_info } = useContext(informacionInicialContext)

    const [usuarioLoggeado, setUsuarioLoggeado] = useState(usuario_info)

    return (
        <>
            <Button
                onClick={alternarMostrar}
                variant="none"
                style={{ backgroundColor: "#86d4da", width: "40px", height: "40px" }}
                className=" rounded-5 text-white fs-5 p-0 cursor-pointer transition">
                <i className="fa-solid fa-user-tie  fs-4 m-0 "></i>
            </Button>
            <SuspenseLoadingComponent>
                {
                    mostrar &&
                    <InterfazDeIngresoDeUsuario
                        mostrar={mostrar}
                        alternarMostrar={alternarMostrar}
                        lista_de_usuarios={lista_de_usuarios}
                        usuarioLoggeado={usuarioLoggeado}
                        setUsuarioLoggeado={setUsuarioLoggeado}
                    />
                }
            </SuspenseLoadingComponent>
        </>
    );
})