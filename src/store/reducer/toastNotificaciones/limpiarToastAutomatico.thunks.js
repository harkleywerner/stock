import { removerToast } from "./toastNotificaciones.slice";

const limpiarToastAutomaticoThunks = () => {

    return (dispatch, getState) => {

        const intervalo = setInterval(() => {
            const { toast_notificaciones } = getState()

            const listaToast = toast_notificaciones.listaToast

            const id = listaToast[0]?.id

            dispatch(removerToast({ id }))
            
            if(listaToast.length == 0) clearInterval(intervalo)

        }, 300);
    }
}
export default limpiarToastAutomaticoThunks