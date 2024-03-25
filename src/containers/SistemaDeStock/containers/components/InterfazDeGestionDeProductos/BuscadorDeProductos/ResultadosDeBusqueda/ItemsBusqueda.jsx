import { memo } from "react"
import { Stack } from "react-bootstrap"

const ItemsBusqueda = memo(({
    insertarParametros,
    item,
    alternarMostrar
}) => {

    const { nombre } = item

    const onClick = () => {
        alternarMostrar(false)
        insertarParametros(item)
    }

    return (
        <Stack
            onClick={onClick}
            direction="horizontal"
            className=" transition bg-hoverdark  py-1 bg-white text-secondary cursor-pointer">
            <i style={{ background: "#57BDC6", padding: "6px" }}
                className="fa-solid mx-1 rounded-circle text-white  fa-magnifying-glass"></i>
            <p className="m-0 fw-normal w-100 p-2  text-truncate font">{nombre}</p>
        </Stack>
    )
})

export default ItemsBusqueda