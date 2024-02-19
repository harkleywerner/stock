import { groupByUtils } from "@/utils/groupBy.utils";


export const calcularStockSalienteHelper = ({ stock = [], stock_data_base = [] }) => {//Calcula para enviarle al servidor.

    const groupBy = groupByUtils({ propiedad: "id_producto", array: stock })

    const mapeoStock = stock_data_base.map(item => {

        const producto = groupBy[item.id_producto]

        if (!producto) {
            return { ...item, accion: "delete" }
        }
        else {

            delete groupBy[producto.id_producto] //Borramos directamente la propiedad de la memoria del objecto.  
            //Este enfoque sirve para indicarle luego cuales del productos stock con respecto al data base son los nuevos.
            if (producto.cantidad != item.cantidad || item.sincronizacion == "put") return { ...producto, accion: "put" }
        }

    }).filter(item => item !== undefined)

    for (const i in groupBy) {
        const removes = { ...groupBy[i], accion: "post" }
        mapeoStock.push(removes)
    }

    return mapeoStock

};