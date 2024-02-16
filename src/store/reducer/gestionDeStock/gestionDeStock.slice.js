import { createSlice } from "@reduxjs/toolkit"
import crud_stock_slice from "../helpers/crudStock.slice"

const initialState = {
    stock: [],
    inicializado: false,
    stock_data_base: [],
    stock_info: undefined
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
        },
        sincronizarStockDb: (state, action) => {
            const stock = action.payload
            state.stock_data_base = stock
        },
        establecerStockInfo: (state, action) => {
            const stockInfo = action.payload
            state.stock_info = stockInfo
            state.inicializado = false //Se establece en false para que se inicialice al 100% con los detalles del  stock
        }
    }
})

export const { addProducto, deleteProducto, editProducto, inicilizarStock, establecerStockInfo, sincronizarStockDb } = sliceStock.actions
export default sliceStock.reducer
