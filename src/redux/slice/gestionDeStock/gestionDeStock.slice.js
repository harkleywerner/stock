import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    stock: [],
    inicializado: false,
    stock_data_base: []
}

const sliceStock = createSlice({
    name: "sliceStock",
    initialState,
    reducers: {
        addProducto: (state, action) => {
            if (!state.inicializado) return
            const producto = action.payload
            state.stock = [...state.stock, producto]
        },
        deleteProducto: (state, action) => {
            const { id_producto } = action.payload

            state.stock = state.stock.filter(item => item.id_producto !== id_producto)
        },
        editProducto: (state, action) => {

            const { id_actual, id_producto, cantidad } = action.payload

            state.stock = state.stock.map(item => {
                if (item.id_producto == id_actual) {
                    return { ...item, cantidad, id_producto: id_actual }
                }
                return item
            })
        },
        inicilizarStock: (state, action) => {
            const stock = action.payload
            state.stock = stock
            state.inicializado = true
            state.stock_data_base = stock
        }
    }
})

export const { addProducto, deleteProducto, editProducto, inicilizarStock } = sliceStock.actions
export default sliceStock.reducer
