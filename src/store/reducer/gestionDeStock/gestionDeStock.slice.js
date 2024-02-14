import { createSlice } from "@reduxjs/toolkit"
import crud_stock_slice from "../helpers/crudStock.slice"

const initialState = {
    stock: [],
    inicializado: false,
    stock_data_base: []
}

const sliceStock = createSlice({
    name: "sliceStock",
    initialState,
    reducers: {
        ...crud_stock_slice,
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
