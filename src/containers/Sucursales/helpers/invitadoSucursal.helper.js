import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const invitadoSucursalHelper = ({
    dataInvitado = {},
    generatePromise,
    data,
    establecerInformacion,
}) => {

    const { tipo } = dataInvitado

    const nav = useNavigate()

    useEffect(() => {
        if (tipo == "success") {
            nav("/stock")
            establecerInformacion({sucursal_info : data})
        }
    }, [tipo])

    return () => {
        const promesa = {
            method: "POST",
            url: "sucursales/invitado",
            data,
            id: "invitado"
        }
        generatePromise({ promesa })
    }

};