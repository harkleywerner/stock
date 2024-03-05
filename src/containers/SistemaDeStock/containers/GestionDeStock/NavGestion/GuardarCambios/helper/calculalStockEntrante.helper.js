export const calcularStockEntranteHelper = ({
    data,
    stock_data_base = [],
    stock = []
}) => {//Calcula lo que viene del servidor.

    const {
        success_commit = {},
        failed_commit = {},
    } = data

    const { s_patch, s_delete, s_post } = success_commit

    const { f_patch, f_delete, f_post } = failed_commit

    const filtrarEliminados = stock_data_base.filter(item => !s_delete.includes(item.id_producto) && !f_post.includes(item.id_producto))

    const nuevoStock = filtrarEliminados.map(item => {

        const faildPatch = f_patch[item.id_producto]

        const faildDelete = f_delete[item.id_producto]

        const successPatch = s_patch[item.id_producto]

        if (successPatch) {
            return { ...item, ...successPatch, sincronizacion: "success" }
        }
        else if (faildPatch) {

            return {
                ...item,
                ...faildPatch,
                sincronizacion: "expecting"
            }
        } else if (faildDelete) {
            return { ...item, ...faildDelete, sincronizacion: "denied" }
        }

        return item
    })

    stock.forEach(i => {
        const producto = s_post[i.id_producto]
        if (producto) {
            nuevoStock.push({ ...i, sincronizacion: "success", ...producto })
        }
    });

    return {
        nuevoStock,
    }
}