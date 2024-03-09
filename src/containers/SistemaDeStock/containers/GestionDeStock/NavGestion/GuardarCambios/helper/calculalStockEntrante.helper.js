export const calcularStockEntranteHelper = ({
    data,
    stock_data_base = [],
    stock = []
}) => {//Calcula lo que viene del servidor.


    const { resumen } = data || {}

    let copiedResumen = JSON.parse(JSON.stringify(resumen))

    const hora_de_cambios = Date.now()

    const setter = new Set(stock_data_base.map(item => item.id_producto));

    const filtrado = stock.filter(i => !setter.has(i.id_producto))

    const nuevoStock = [...stock_data_base, ...filtrado].map(item => {

        const { id_producto, cantidad, nombre, categoria } = item

        const item_entrante = resumen[id_producto] || {}

        const { sincronizacion } = item_entrante

        if (sincronizacion) {
            copiedResumen[id_producto] = {
                hora_de_cambios,
                cantidad,
                nombre,
                categoria,
                ...resumen[id_producto],
            }
        }

        if (["info_delete", "success_delete","info_patch"].includes(sincronizacion)) {
            return null
        } else if (["success_post", "info_post", "success_patch"].includes(sincronizacion)) {
            return { ...item, ...item_entrante }
        }

        return item

    }).filter(item => item != null)


    return {
        nuevoStock,
        resumen: Object.values(copiedResumen)
    }
}