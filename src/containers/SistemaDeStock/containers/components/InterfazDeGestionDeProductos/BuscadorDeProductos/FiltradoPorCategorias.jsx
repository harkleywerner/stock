import { Dropdown } from "react-bootstrap"
import { memo } from "react"
import { PrimeraLetraMayusculaUtils } from "@/utils/PrimeraLetraMayuscula.utils"

const categoriasss = [
    { id: 2, nombre: "cremas" },
    { id: 3, nombre: "dulce de leche" },
    { id: 4, nombre: "al agua" },
    { id: 1, nombre: "chocolate" },
    { id: 5, nombre: "tortas" },
]

const DropdownItems = memo(({
    nombre,
    verificarCategoriaSeleccionada,
    establecerCategoria,
    id
}) => {

    return (
        <Dropdown.Item
            as={"li"}
            id="item-categorias"
            onClick={() => establecerCategoria(id)}
            style={{ background: verificarCategoriaSeleccionada ? "#0cb1eb" : "#7CDAFD", borderBottom: "3px solid #0cb1eb" }}
            className=" d-flex p-1 rounded-4 my-1 px-2 shadow cursor-pointer transition">
            <p className="m-0 n text-white m-auto ">{PrimeraLetraMayusculaUtils(nombre)}</p>
        </Dropdown.Item>
    )
})

export const FiltradoPorCategorias = ({
    establecerCategoria,
    categoria
}) => {
    return (
        <Dropdown
            autoClose="inside"
            className="mx-1 h-100 rounded-3">
            <Dropdown.Toggle
                style={{ backgroundColor: "#DE4E75", borderBottom: "3px solid #b12540" }}
                id="dropwdown-categorias"
                variant="none"
                className="d-flex py-2 text-white h-100 ">
                <i className="fa-solid fs-5 fa-filter"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
                style={{ backgroundColor: "transparent" }}
                as="ul"
                className=" border-0 px-1">
                {
                    categoriasss.map(i =>
                        <DropdownItems key={i.id}
                            {...i}
                            establecerCategoria={establecerCategoria}
                            verificarCategoriaSeleccionada={i.id == categoria} />)
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}