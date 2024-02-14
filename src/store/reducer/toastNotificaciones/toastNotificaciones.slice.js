import { createSlice } from "@reduxjs/toolkit"
import shortUUID from "short-uuid"


const initialState = {
    listaToast: [],
}

const sliceToast = createSlice({
    name: "toast",
    initialState,
    reducers: {
        generarToast: (state, action) => {

            const nuevaToast = action.payload

            const verificarLago = state.listaToast.length > 2 ? state.listaToast.slice(1) : state.listaToast


            state.listaToast = [
                ...verificarLago,
                {
                    ...nuevaToast, id: shortUUID.generate()
                }]
        },

        removerToast: (state, action) => {
            const { id } = action.payload
            state.listaToast = state.listaToast.filter(item => item.id !== id)
        }
    }
})


export const { generarToast, removerToast } = sliceToast.actions
export default sliceToast.reducer
