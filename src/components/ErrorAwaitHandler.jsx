import { useAsyncError, useNavigate } from "react-router-dom"
import wrapperAlerta from "../provider/AlertaProvider/wrapperAlerta"
import { memo, useEffect } from "react"
import { Button } from "react-bootstrap"

const ErrorAwaitHandler = memo(({ establercerAlerta }) => {
   const error = useAsyncError()
   const nav = useNavigate()
console.log(error)

   const { message, tipo, code } = error.response.data || {}
   establercerAlerta({ texto: `${tipo} : ${message}`, tipo: "danger" })


   const onClick = () => {
      const { pathname, search } = window.location
      nav(`${pathname}${search}`)
   }

   return (
      <Button
         onClick={onClick}
         className="mt-3 p-4 text-uppercase">
         Reintentar
      </Button>
   )

})


export default wrapperAlerta(ErrorAwaitHandler)