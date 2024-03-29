const crud_stock_slice = {
    addProducto: (state, action) => {

        if (!state.inicializado) return

        const producto = action.payload

        state.stock = [...state.stock, producto]
    },
    deleteProducto: (state, action) => {

        if (!state.inicializado) return

        const { id_producto } = action.payload

        state.stock = state.stock.filter(item => item.id_producto !== id_producto)
    },
    editProducto: (state, action) => {

        if (!state.inicializado) return

        const { id_producto, cantidad } = action.payload

        state.stock = state.stock.map(item => {
            if (item.id_producto == id_producto) {
                return { ...item, cantidad }
            }
            return item
        })
    },
}

export default crud_stock_slice