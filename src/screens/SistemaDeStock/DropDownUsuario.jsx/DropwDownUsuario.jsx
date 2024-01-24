import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import obtenerUsuarios from "./api/obtenerUsuarios";



const ListaDeUsuarios = ({ Nombre, Apellido }) => {
    return (
        <Dropdown.Item className="text-secondary">{Nombre} {Apellido}</Dropdown.Item>
    )
}

export const DropwDownUsuario = () => {

    const [usuario, setUsuarios] = useState([])

    useEffect(() => {

        (async () => {
            const res = await obtenerUsuarios()
            console.log(res)
            setUsuarios(res)
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
};