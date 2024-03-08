export const calcularStockEntranteHelper = ({
    data,
    stock_data_base = [],
    stock = []
}) => {//Calcula lo que viene del servidor.

    const {
        success_commit = {},
        failed_commit = {},
    } = data

    const resumen = []

    const hora_de_cambios = Date.now()

    const resumenPush = (data) => resumen.push({ hora_de_cambios, ...data })

    const { s_patch, s_delete, s_post } = success_commit

    const { f_patch, f_delete, f_post } = failed_commit

    const nuevoStock = stock_data_base.map(item => {

        const { cantidad, nombre, categoria } = item
        const successDelete = s_delete.includes(item.id_producto)

        const successPatch = s_patch[item.id_producto]

        const faildPatch = f_patch[item.id_producto]

        const faildDelete = f_delete[item.id_producto]

        const failedPost = f_post.includes(item.id_producto)

        if (successPatch) {
            resumenPush({ ...successPatch, nombre, sincronizacion: "success", categoria })
            return { ...item, ...successPatch }
        }
        else if (successDelete) {
            resumenPush({ cantidad, nombre, sincronizacion: "success_delete", categoria })
            return null
        }
        else if (faildPatch) {
            resumenPush({ nombre, ...faildPatch, sincronizacion: "expecting", categoria })
        } else if (faildDelete) {
            resumenPush({ nombre, ...faildDelete, sincronizacion: "failed_delete", categoria })
        } else if (failedPost) {
            resumenPush({ nombre, sincronizacion: "failed_post", categoria })
            return null
        }

        return item
    }).filter(item => item != null)

    stock.forEach(i => {
        const producto = s_post[i.id_producto]
        const { cantidad, nombre, categoria } = i
        if (producto) {
            resumenPush({ cantidad, nombre, sincronizacion: "success_post", categoria })
            nuevoStock.push({
                ...i,
                ...producto,
            })
        }
    });

    return {
        nuevoStock,
        resumen
    }
}