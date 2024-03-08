import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";
import { lazy, useContext, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import styles from "./styles/NavStock.module.css"

const InterfazDeIngresoDeUsuario = lazy(() => import("@/components//InterFazDeIngresoDeUsuario/InterfazDeIngresoDeUsuario"))

export const UsuariosItem = (() => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { lista_de_usuarios, usuario_info } = useContext(informacionInicialContext)

    const [usuarioLoggeado, setUsuarioLoggeado] = useState(usuario_info)

    return (
        <Nav.Item>
            <Button
                onClick={alternarMostrar}
                variant="none"
                className={`${styles.itemsDecorate} text-white fs-5 p-0 cursor-pointer `} 
                style={{ backgroundColor: "#86d4da", width: "40px", height: "40px" }}>
                <i className="fa-solid fa-user-tie transition fs-4 m-0 "></i>
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
            </Nav.Item>
      );
})