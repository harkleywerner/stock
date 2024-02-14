

const agruparPorId = (stock) => {
    return stock.reduce((acc, current) => {
        acc[current.id_producto] = current
        return acc
    }, {})

}

export const calcularNuevoStockHelper = ({ stock = [], stock_data_base = [] }) => {

    const groupBy = agruparPorId(stock)

    const mapeoStock = stock_data_base.map(item => {

        const producto = groupBy[item.id_producto]

        if (!producto) {
            return { ...item, accion: "delete" }
        }
        else {

            delete groupBy[producto.id_producto] //Borramos directamente la propiedad de la memoria del objecto.  
            //Este enfoque sirve para indicarle luego cuales del productos stock con respecto al data base son los nuevos.
            if (producto.cantidad != item.cantidad) return { ...producto, accion: "put" }
        }

    }).filter(item => item !== undefined)

    for (const i in groupBy) {
        const removes = { ...groupBy[i], accion: "post" }
        mapeoStock.push(removes)
    }

    return mapeoStock

};

