import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gestion_stock from "./reducer/gestionDeStock/gestionDeStock.slice";
import nuevo_stock from "./reducer/nuevoStock/nuevoStock.slice";
import toast_notificaciones from "./reducer/toastNotificaciones/toastNotificaciones.slice";


 const rootCombined = combineReducers({
    gestion_stock,
    nuevo_stock,
    toast_notificaciones,
})

const resetStore = (state,action) => { //=> Se resetea cuando se cambia de sucursal
    if(action.type == "store/reset"){
        return rootCombined({},action)
    }
    return rootCombined(state,action)
}


export const store = configureStore({
    reducer: resetStore,
})

export default rootCombined

