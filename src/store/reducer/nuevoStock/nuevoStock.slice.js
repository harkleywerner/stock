import { createSlice } from "@reduxjs/toolkit"
import crud_stock_slice from "../helpers/crudStock.slice"


const initialState = {
    stock: [],
    inicializado: true
}

const stockSlice = createSlice({
    name: "nuevostock",
    initialState,
    reducers: {
        ...crud_stock_slice,
        removerStock: (state) => {
            state.stock = []
            state.inicializado = true
        },
        changeInicializado: (state) => {
            state.inicializado = false
        }
    }
})



export const { addProducto, deleteProducto, editProducto, removerStock,changeInicializado} = stockSlice.actions
export default stockSlice.reducer