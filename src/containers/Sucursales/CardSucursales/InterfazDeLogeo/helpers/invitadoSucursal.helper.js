
export const invitadoSucursalHelper = ({
    generatePromise,
    data,
}) => {

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