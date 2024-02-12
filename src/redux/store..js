import { configureStore } from "@reduxjs/toolkit";
import toast_notificaciones from "./slice/toastNotificaciones/toastNotificaciones.slice"
import gestion_stock from "./slice/gestionDeStock/gestionDeStock.slice"

export const store = configureStore({
    reducer: {
        toast_notificaciones,
        gestion_stock
    }
})