const verificacionStock = ({ stock, parametros, productoSeleccionado, }) => {

    const keys = Object.keys(parametros)

    const verificaSiSeEncuentra = stock.find(item => item.id_producto == parametros.id_producto)

    if (keys.length == 0) {
        return {
            toast: { texto: "Debes agregar un item para continuar", tipo: "warning" },
            tipo: "empty"
        }
    }

    else if (verificaSiSeEncuentra?.id_producto == productoSeleccionado?.id_producto) {

        return {
            toast: { texto: `Item ${productoSeleccionado.nombre} editado  `, tipo: "success" },
            tipo: "edit"
        }
    }
    else if (!productoSeleccionado && !verificaSiSeEncuentra) {

        return {
            toast: { texto: `${parametros.nombre} agregado  `, tipo: "success" },
            tipo: "add"
        }

    } else {
        return {
            toast: { texto: "El item ya se encuentra en la tabla para cambiar su valor presione en editar en la tabla", tipo: "warning" },
            tipo: "found"
        }
    }
}

export default verificacionStock