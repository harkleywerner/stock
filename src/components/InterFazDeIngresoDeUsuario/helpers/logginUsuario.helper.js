import { useEffect } from "react";

export const logginUsuarioHelper = ({
    establecerLoggeado,
    ref,
    data,
    tipo,
    generatePromise
}) => {

    const { id_usuario, contraseña } = data


    useEffect(() => {

        ref.current.focus()

        if (tipo == "success") {
            establecerLoggeado({ id_usuario })
        }
    }, [tipo])

    return () => {

        if (contraseña.length >= 6) return

        const promesa = {
            method: "POST",
            url: "usuarios",
            data: { ...data },
            id: "usuario",
        }

        generatePromise({ promesa })
    }


};