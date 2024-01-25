import { lazy, memo, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import obtenerUsuarios from "./api/obtenerUsuarios";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import wrapperAlerta from "@/provider//AlertaProvider/wrapperAlerta";

const InterfazDeIngresoDeUsuario = lazy(() => import("@/components//InterfazDeIngresoDeUsuario"))

const ListaDeUsuarios = (item) => {
    const { alternarMostrar, mostrar } = useAlternarComponentes()
    const { nombre, apellido, id_usuario } = item

    return (
        <>
            <Dropdown.Item
                onClick={alternarMostrar}
                className="text-secondary">
                {nombre} {apellido}
            </Dropdown.Item>
            {
                mostrar &&
                <InterfazDeIngresoDeUsuario
                    key={id_usuario}
                    {...item}
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar} />
            }
        </>

    )
}


export const DropwDownUsuario = wrapperAlerta(memo(({ establercerAlerta }) => {

    const [usuario, setUsuarios] = useState([])

    useEffect(() => {

        (async () => {
            try {
                const res = await obtenerUsuarios()

                setUsuarios(res)
        
            } catch (error) {
              
                establercerAlerta({ texto: `Error ${error.type || "no identificado"}`, tipo: "danger", id: "usuarios-danger-1" })
            }

        })()

    }, [])

    return (
        <Dropdown >
            <Dropdown.Toggle
                variant="none"
                className="border-0 text-white fs-5 p-0 cursor-pointer hover-rosa transition">
                <i className="fa-solid fa-user-tie  fs-3 m-0 "></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    usuario.map(item => <ListaDeUsuarios key={item.id_usuario} {...item} />)
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}))