import { useEffect, useState } from "react"
import BuscadorInput from "./BuscadorInput"

export const BuscadorResponsive = ({ texto }) => {

    const [mostrar, alternarMostrar] = useState(false)


    const verificar = mostrar ? "w-100 h-100 position-absolute px-3 " : "p-0"



    const onClick = () => {
        alternarMostrar(true)
    }


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
            style={{ background: "#57BDC6", right: "0%",top : "0%" }}
            className={`${verificar}  position-relative d-flex align-items-center `}>

            <div
                className="w-100  d-flex justify-content-center align-items-center" >

                {
                    mostrar && <i
                        style={{ color: "#57BDC6" }}
                        onClick={() => alternarMostrar(false)}
                        className="fa-solid mx-1 rounded-circle bg-hoverdark cursor-pointer bg-white p-2 mx- text-ligthdark fs-5 fa-left-long"></i>
                }
                {
                    !mostrar && <i
                        onClick={onClick}
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