import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";
import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const DropDownSucursal = () => {

    const { sucursal_info } = useContext(informacionInicialContext)

    const { nombre } = sucursal_info 

    return (
        <Dropdown className="position-relative">
            <Dropdown.Toggle
                style={{ maxWidth: "300px" }}
                variant="none"
                className="border-0 text-truncate text-white px-1 fs-5  cursor-pointer  transition">
                <p className="m-0 fs-5 d-inline ">
                    {nombre}
                </p>
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{ left: "-20%" }}
                className="border-0  p-1 position-absolute">
                <Link
                    className="text-decoration-none"
                    to={"/sucursales"}>
                    <Dropdown.ItemText
                        style={{ background: "#de4e75", borderBottom: "3px solid #b12540" }}
                        className="text-white border-end border-top border-start text-nowrap m-auto"
                        as={Button}>
                        Cambiar de Sucursal
                    </Dropdown.ItemText>
                </Link>

            </Dropdown.Menu>
        </Dropdown>
    );
}