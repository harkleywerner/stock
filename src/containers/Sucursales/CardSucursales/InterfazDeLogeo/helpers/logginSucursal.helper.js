
const logginSucursalHelper = ({
    generatePromise,
    data,
}) => {

    return () => {
        
        if(data.contraseña.length == 0) return

        const promesa = {
            method: "POST",
            data,
            id: "login",
            url: "sucursales"

        }
        generatePromise({ promesa })
    }

}

export default logginSucursalHelper