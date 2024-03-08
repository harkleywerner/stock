export const calcularStockEntranteHelper = ({
    data,
    stock_data_base = [],
    stock = []
}) => {//Calcula lo que viene del servidor.

    const {
        success_commit = {},
        failed_commit = {},
    } = data

    const historial = []

    const hora_de_cambios = Date.now()

    const historialPush = (data) => historial.push({ hora_de_cambios, ...data })

    const { s_patch, s_delete, s_post } = success_commit

    const { f_patch, f_delete, f_post } = failed_commit

    const nuevoStock = stock_data_base.map(item => {

        const successDelete = s_delete.includes(item.id_producto)

        const successPatch = s_patch[item.id_producto]

        const faildPatch = f_patch[item.id_producto]

        const faildDelete = f_delete[item.id_producto]

        const failedPost = f_post.includes(item.id_producto)

        if (successPatch) {
            historialPush({ ...item, sincronizacion: "success" })
            return { ...item, ...successPatch }
        }
        else if (successDelete) {
            historialPush({ ...item, sincronizacion: "success_delete" })
            return null
        }
        else if (faildPatch) {
            historialPush({ ...item,...faildPatch ,sincronizacion: "expecting" })
        } else if (faildDelete) {
            historialPush({ ...item,...faildDelete ,sincronizacion: "failed_delete" })
    
        } else if (failedPost) {
            historialPush({ ...item, sincronizacion: "failed_post" })
            return null
        }

        return item
    }).filter(item => item != null)

    stock.forEach(i => {
        const producto = s_post[i.id_producto]
        if (producto) {
            historialPush({ ...i, sincronizacion: "success_post" })
            nuevoStock.push({
                ...i,
                ...producto,
            })
        }
    });

    return {
        nuevoStock,
        historial
    }
}