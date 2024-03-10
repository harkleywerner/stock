import { numeroDeDosDigitosUtils } from "@/utils/numeroDeDosDigitos.utils"
import { Stack } from "react-bootstrap"
import texto_sincronizaciones_contants from "./constants/textosSincronizaciones.contants"
import paleta_de_colores_contants from "./constants/paletaDeColores.contants"


const Items = ({
    sincronizacion,
    nombre,
    hora_de_cambios,
    cantidad_sincronizacion,
    cantidad,
    openAccordion,
    establecerAccordion,
    id,
    categoria
}) => {

    const { texto = "" } = texto_sincronizaciones_contants[sincronizacion]

    const { color, background, badge } = paleta_de_colores_contants[sincronizacion.split("_")[0]]

    const splitTexto = texto.split("?")

    const time = new Date(hora_de_cambios)

    const TIEMPO_ACTUAL = Date.now()

    const TIEMPO_MAXIMO = hora_de_cambios + (1000 * 60 * 5)

    const hora = time.getHours()

    const minutos = time.getMinutes()

    const segundos = time.getSeconds()

    const onClick = () => {
        establecerAccordion(id)
    }

    return (
        <div
            style={{ backgroundColor: `#${background}`, borderBottom: `3px solid #${badge}` }}
            className="rounded-2 my-2 position-relative">
            {TIEMPO_ACTUAL < TIEMPO_MAXIMO &&
                <small
                    style={{ fontSize: "10px", zIndex: "1000" }}
                    className={`bg-dark start-0 translate-middle rounded-2  position-absolute   opacity-50 text-white px-1`}>N</small>
            }
            <div
                onClick={onClick}
                className="d-flex cursor-pointer  justify-content-between position-relative   align-items-center">
                <Stack
                    direction="horizontal"
                    gap={2}>
                    <i
                        style={{ color: `#${color}` }}
                        className={`fa-solid fs-4 ms-2 lh-0 ${!openAccordion ? "fa-caret-down" : "fa-minus"}`}></i>
                    <p className="fs-5 text-white m-0">{nombre}</p>

                </Stack>
                <small style={{ background: `#${badge}` }} className="text-white badge mx-1">
                    {numeroDeDosDigitosUtils(hora)}:
                    {numeroDeDosDigitosUtils(minutos)}:
                    {numeroDeDosDigitosUtils(segundos)}
                </small>
            </div>
            {
                openAccordion &&
                <section style={{ minHeight: "40px", top: "110%" }}
                    className=" w-100 text-white ms-1 justify-content-center aling-items-center">
                    <small className="m-0 p-1   text-center">
                        {splitTexto[0]}
                        {splitTexto.length > 1 && <span className="ms-2" style={{ color: `#${color}`, fontSize: "18px" }}>{cantidad_sincronizacion ?? cantidad}</span>}
                        {splitTexto[1]}
                    </small>
                    <small style={{ color: `#${color}` }} className="d-block me-2 text-end">{categoria}</small>
                </section>
            }
        </div >
    )
}

export default Items