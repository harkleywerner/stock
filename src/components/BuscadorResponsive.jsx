import { useEffect, useState } from "react"
import BuscadorInput from "./BuscadorInput"


export const BuscadorResponsive = ({ texto }) => {

    const [mostrar, alternarMostrar] = useState(false)

    const verificar = mostrar ? "w-100 position-absolute p-1 " : "p-0"

    useEffect(() => {

        const checkeoView = (e) => {
       
            if (mostrar && e.target.innerWidth >= 768) {
                alternarMostrar(false)
            }

        }
        window.addEventListener("resize", checkeoView)
        
        return () => {
            window.removeEventListener("resize", checkeoView)
        }
    }, [mostrar])

    return (
        <div
            style={{ background: "#57BDC6", right: "0%" }}
            className={`${verificar} d-flex align-items-center `}>
            <div
                className="w-100 position-relative " >

                {
                    !mostrar && <i
                        id="lupa-contenedor"
                        style={{ background: "#F0F2F5", padding: "10px", color: "#57BDC6" }}
                        className="fa-solid  cursor-pointer d-inline-block d-md-none  fs-5 rounded-circle mx-1 fa-magnifying-glass "></i>
                }

                <span
                    className={`${mostrar ? "d-inline" : "d-none"} w-100 d-md-inline-block  `}>
                    {
                        <BuscadorInput texto={texto} />
                    }
                </span>

            </div>

        </div>
    )
}