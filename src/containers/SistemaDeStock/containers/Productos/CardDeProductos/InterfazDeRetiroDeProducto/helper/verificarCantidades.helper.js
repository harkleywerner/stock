export const verificarCantidadesHelper = ({cantidadEnt,cantidadActual}) => {
    const { devoluciones_permitidas, cantidad_total } = cantidadActual

    const verificarDevoluciones = cantidadEnt > devoluciones_permitidas ? cantidadEnt : devoluciones_permitidas

    const verificarRetiros = cantidadEnt > cantidad_total ? cantidad_total : cantidadEnt

    const evaluarCantidad = Math.sign(cantidadEnt) == -1 ? verificarDevoluciones : verificarRetiros

    return {
        evaluarCantidad
    }
};