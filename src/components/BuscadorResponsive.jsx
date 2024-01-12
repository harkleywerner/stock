import { useEffect, useState } from "react"
import BuscadorInput from "./BuscadorInput"


export const BuscadorResponsive = ({ texto }) => {

    const [mostrar, alternarMostrar] = useState(false)

    const verificar = mostrar ? "w-100 position-absolute p-1 " : "p-0"

    useEffect(() => {
        const cheackearClickExterior = (e) => {

            if (e.target.id == "lupa-contenedor") {
                alternarMostrar(true)
            }

            if (e.target.tagName !== "INPUT" && e.target.id !== "lupa-contenedor") {
                alternarMostrar(false)
            }
        }

        const checkeoView = (e) => {
            if (mostrar && e.target.innerWidth >= 768) {
                alternarMostrar(false)
            }

        }

        window.addEventListener("resize", checkeoView)

        window.addEventListener("click", cheackearClickExterior)
        
        return () => {
            window.removeEventListener("click", cheackearClickExterior)
            window.removeEventListener("resize", checkeoView)
        }
    }, [])

    return (
        <div
            style={{ background: "#57BDC6", right: "0%" }}
            className={`${verificar} d-flex align-items-center `}>
            <div
                className="w-100 position-relative mx-1" >

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