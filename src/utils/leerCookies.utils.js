export const leerCookiesUtils = (nombre) => {

    const splitCookies = document.cookie.split(";")


    const filtrado = splitCookies.filter(item => item.toString().includes(nombre) && item !== nombre)

    if (filtrado.length > 0) {
 
        const cookieLibre = filtrado[0].trim().substring(nombre.length + 1)

        const codificado = decodeURIComponent(cookieLibre)

        const verificarTipoDeDato = codificado.slice(0, 2)

        if (verificarTipoDeDato == "j:") { //=> J es  objecto o array
            return JSON.parse(codificado.substring(2))
        } else {
            return codificado
        }


    }

};