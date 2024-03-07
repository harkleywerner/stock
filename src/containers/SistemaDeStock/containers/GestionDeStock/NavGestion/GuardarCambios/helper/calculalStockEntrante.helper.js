export const calcularStockEntranteHelper = ({
    data,
    stock_data_base = [],
    stock = []
}) => {//Calcula lo que viene del servidor.

    const {
        success_commit = {},
        failed_commit = {},
    } = data

    const hora_de_cambios = Date.now()

    const { s_patch, s_delete, s_post } = success_commit

    const { f_patch, f_delete, f_post } = failed_commit

    const filtrarEliminados = stock_data_base.filter(item => !s_delete.includes(item.id_producto) && !f_post.includes(item.id_producto))

    const nuevoStock = filtrarEliminados.map(item => {

        const faildPatch = f_patch[item.id_producto]

        const faildDelete = f_delete[item.id_producto]

        const successPatch = s_patch[item.id_producto]

        if (successPatch) {
            return { ...item, ...successPatch, sincronizacion: "success", hora_de_cambios }
        }
        else if (faildPatch) {
            return {
                ...item,
                ...faildPatch,
                hora_de_cambios,
                sincronizacion: "expecting"
            }
        } else if (faildDelete) {
            return {
                ...item,
                ...faildDelete,
                sincronizacion: "denied",
                hora_de_cambios
            }
        }

        return item
    })

    stock.forEach(i => {
        const producto = s_post[i.id_producto]
        if (producto) {
            nuevoStock.push({
                ...i,
                sincronizacion: "success",
                ...producto,
                hora_de_cambios
            })
        }
    });

    return {
        nuevoStock,
    }
}