export const calcularStockEntranteHelper = ({
    success_commit = {},
    failed_commit = {},
    stock_data_base = [],
}) => {//Calcula lo que viene del servidor.

    const succes_commit_put = success_commit["put"]
    const succes_commit_delete = success_commit["delete"]
    const success_commit_post = success_commit["post"]

    const failed_commit_put = failed_commit["put"]
    const failed_commit_delete = failed_commit["delete"]

    const filtrarEliminados = stock_data_base.filter(item => !succes_commit_delete.includes(item.id_producto))

    const nuevoStock = filtrarEliminados.map(item => {

        const failed = failed_commit_put[item.id_producto] || failed_commit_delete[item.id_producto]

        const success = succes_commit_put[item.id_producto]

        if (failed) {
            return { ...failed, sincronizacion: failed.accion }
        }
        else if (success) {
            return { ...success, sincronizacion: "success" }
        }
        return item

    })




    return [...nuevoStock, ...success_commit_post.map(item => ({ ...item, sincronizacion: "success" }))]

};