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
            state.stock_data_base = stock
            state.inicializado = true
        },
        sincronizarStock: (state, action) => {
            const stock = action.payload
            state.stock = stock
            state.stock_data_base = stock
        },
        establecerStockInfo: (state, action) => {
            const stockInfo = action.payload
            state.stock_info = stockInfo
            state.inicializado = false
        },
        establecerPendientes: (state, action) => {
            const pendientes = action.payload
            state.stock_info = { ...state.stock_info, ...pendientes }
        },

    }
})

export const { addProducto, deleteProducto, editProducto, inicilizarStock, establecerStockInfo, sincronizarStock, establecerPendientes } = sliceStock.actions
export default sliceStock.reducer
