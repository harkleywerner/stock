import { useAsyncError, useLocation, useNavigate } from "react-router-dom"
import wrapperAlerta from "../provider/NotificacionesProvider/wrapperNotificaciones"
import { memo, useEffect } from "react"
import { Button } from "react-bootstrap"

const ErrorAwaitHandler = memo(({ establecerAlerta, t }) => {



   return (
      <Button
         className="mt-3 p-4 text-uppercase">
         Reintentar
      </Button>
   )

})


export default wrapperAlerta(ErrorAwaitHandler)