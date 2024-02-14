import { configureStore } from "@reduxjs/toolkit";
import toast_notificaciones from "./reducer/toastNotificaciones/toastNotificaciones.slice"
import gestion_stock from "./reducer/gestionDeStock/gestionDeStock.slice"
import nuevo_stock from "./reducer/nuevoStock/nuevoStock.slice"

export const store = configureStore({
    reducer: {
        toast_notificaciones,
        gestion_stock,
        nuevo_stock
    }
})