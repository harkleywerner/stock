import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider";
import { memo, useContext, useEffect } from "react";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const DropDownSucursal = wrapperNotificacionesServidor(memo(({
    generatePromise,
    apiData,
    loader
}) => {

    const { sucursal_info } = useContext(informacionInicialContext)

    const { nombre } = sucursal_info

    const { logout = {} } = apiData

    const { tipo } = logout

    const n = useNavigate()

    const apiCall = () => {

        if (loader) return

        const promesa = {
            method: "GET",
            url: "sucursales/logout",
            id: "logout"
        }

        generatePromise({ promesa })
    }

    useEffect(() => {

        if (tipo == "success") {
            n("/sucursales")
        }

    }, [tipo])


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
                <Dropdown.ItemText
                    onClick={apiCall}
                    style={{ background: "#de4e75", borderBottom: "3px solid #b12540" }}
                    className="text-white fs-6 w-100 border-end-0 shadow p-2 border-top-0 border-start-0 text-nowrap m-auto"
                    as={Button}>
                    {
                        loader ? <Spinner size="sm" style={{ height: "25px", width: "25px" }} /> : "Cerrar session"
                    }
                </Dropdown.ItemText>
            </Dropdown.Menu>
        </Dropdown>
    );
}))

