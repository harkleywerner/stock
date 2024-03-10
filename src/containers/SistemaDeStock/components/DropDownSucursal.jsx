import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";
import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const DropDownSucursal = () => {

    const { sucursal_info } = useContext(informacionInicialContext)

    const { nombre } = sucursal_info

    return (
        <Dropdown
            drop="start"
            className="position-relative transition">
            <Dropdown.Toggle
                style={{ maxWidth: "300px" }}
                variant="none"
                className="border-0 text-truncate text-white resaltador px-1 fs-5  cursor-pointer  ">
                {nombre}
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="border-0 p-0 transition ">
                <Link
                    className="text-decoration-none "
                    to={"/sucursales"}>
                    <Dropdown.ItemText
                        style={{ background: "#de4e75", borderBottom: "3px solid #b12540" }}
                        className="text-white fs-6 w-100 border-end-0 shadow p-2 border-top-0 border-start-0 text-nowrap m-auto"
                        as={Button}>
                        Cerrar session
                    </Dropdown.ItemText>
                </Link>
            </Dropdown.Menu>
        </Dropdown>
    );
}

