export const calcularSincronizacionesHelper= ({stockEntrante}) => {
   let contador = 0
 
   stockEntrante.forEach(item => {

      if(item.sincronizacion == "expecting") contador++
   })

   return contador

};