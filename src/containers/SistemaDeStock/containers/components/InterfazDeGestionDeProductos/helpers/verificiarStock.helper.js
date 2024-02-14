const verificacionStock = ({ stock, parametros, productoSeleccionado, }) => {

    const verificaSiSeEncuentra = stock.find(item => item.id_producto == parametros.id_producto)

    if (Object.keys(parametros).length == 0) {
        return {
            toast: { texto: "Debes agregar un item para continuar", tipo: "warning" },
            tipo: "empty"
        }
    }

    else if (verificaSiSeEncuentra && verificaSiSeEncuentra.id_producto == productoSeleccionado.id_producto) {

        return {
            toast: { texto: `Item ${productoSeleccionado?.nombre} editado  `, tipo: "success" },
            tipo: "edit"
        }
    }
    else if (Object.keys(productoSeleccionado).length == 0 && !verificaSiSeEncuentra) {

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