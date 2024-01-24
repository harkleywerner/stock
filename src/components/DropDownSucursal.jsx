import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const DropDownSucursal = () => {
    return (
        <Dropdown className="position-relative">
            <Dropdown.Toggle
            style={{maxWidth : "300px"}}
                variant="none"
                className="border-0 text-truncate text-white px-1 fs-5  cursor-pointer hover-rosa transition">
                <p  className="m-0 fs-5 d-inline ">
                   25 de mayo 226
                </p>
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{left : "-20%"}}
                className="border-0 shadow position-absolute">
                <Link
                    className="text-decoration-none"
                    to={"/sucursales"}>
                    <Dropdown.ItemText
                        style={{ background: "#E84A7A" }}
                        className="text-white border-0 text-nowrap  mx-2  transition m-auto"
                        as={Button}>
                        Cambiar de Sucursal
                    </Dropdown.ItemText>
                </Link>
            </Dropdown.Menu>
        </Dropdown>
    );
}