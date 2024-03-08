import { numeroDeDosDigitosUtils } from "@/utils/numeroDeDosDigitos.utils"
import { Stack } from "react-bootstrap"

const success = { background: "92e3a6", color: "31a84f", badge: "5ace77", }
const failed = { background: "ff9998", color: "cc0605", badge: "ff5e5d", }

const configSincronizaciones = {
    "success": {
        ...success,
        texto: "Se guardaron  ? producto/s exitosamente."
    },
    "success_delete": {
        ...success,
        texto: "El producto se borro exitosamente."
    },
    "success_post": {
        ...success,
        texto: "El producto se agrego exitosamente exitosamente."
    },
    "failed_delete": {
        ...failed,
        texto: "Este producto no puede ser removido debido a que hay ? transsacione/s."
    },
    "failed_post": {
        ...failed,
        texto: "El producto ya se encuentra el stock."
    },
    "expecting": {
        background: "7cdafd", color: "0096d2", badge: "36c9fa",
        texto: "La cantidad minima para modificar este producto es ?."
    }
}


const Items = ({
    sincronizacion,
    nombre,
    hora_de_cambios,
    cantidad_sincronizacion,
    cantidad,
    openAccordion,
    establecerAccordion,
    id_producto
}) => {

    const { color, background, badge, texto } = configSincronizaciones[sincronizacion] || {}

    const time = new Date(hora_de_cambios)

    const TIEMPO_ACTUAL = Date.now()

    const TIEMPO_MAXIMO = hora_de_cambios + (1000 * 60 * 5)

    const hora = time.getHours()

    const minutos = time.getMinutes()

    const segundos = time.getSeconds()

    const onClick = () => {
        establecerAccordion(id_producto)
    }

    const splitTexto = texto.split("?")

    return (
        <div
            style={{ backgroundColor: `#${background}`, borderBottom: `3px solid #${badge}` }}
            className="rounded-2 my-1">
                {TIEMPO_ACTUAL < TIEMPO_MAXIMO && <small>Nuevo</small>} 
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
                    className=" w-100 text-white d-flex justify-content-center aling-items-center">
                    <small className="m-0 p-2 text-center">
                        {splitTexto[0]}
                        {splitTexto.length > 1 && <span style={{ color: `#${color}`, fontSize: "18px" }}>{cantidad_sincronizacion ?? cantidad}</span>}
                        {splitTexto[1]}
                    </small>
                </section>
            }
        </div >
    )
}

export default Items