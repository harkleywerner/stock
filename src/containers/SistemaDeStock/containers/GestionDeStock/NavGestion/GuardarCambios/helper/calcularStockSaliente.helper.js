import { groupByUtils } from "@/utils/groupBy.utils";


export const calcularStockSalienteHelper = ({ stock = [], stock_data_base = [] }) => {//Calcula para enviarle al servidor.

    const groupBy = groupByUtils({ propiedad: "id_producto", array: stock })

    const propiedad_utiles = (input) => {
        const { id_detalle_de_stock, cantidad, id_producto } = input
        return { id_detalle_de_stock, cantidad, id_producto }
    }

    const cambios = {
        patch: [],
        post: [],
        delete: []
    }

    let contador_de_cambios = 0;

    stock_data_base.forEach((item) => {

        const producto = groupBy[item.id_producto]

        if (!producto) {
            const deletes = cambios.delete
            cambios.delete = [...deletes, propiedad_utiles(item)]
            contador_de_cambios++;
        }

        else {
        
            delete groupBy[producto.id_producto] //Borramos directamente la propiedad de la memoria del objecto.  
            //Este enfoque sirve para indicarle luego cuales del productos stock con respecto al data base son los nuevos.
            if (producto.cantidad != item.cantidad || item.sincronizacion == "expecting") {
                const patch = cambios.patch
                cambios.patch = [...patch, propiedad_utiles(producto)] 

                producto.sincronizacion == "none" && contador_de_cambios++;
            }
        }

        
    })


    for (const i in groupBy) {
        const post = cambios.post
        cambios.post = [...post, propiedad_utiles(groupBy[i])]
        contador_de_cambios++;
    }

    return { cambios, contador_de_cambios }

};