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
            id="item-categorias"
            onClick={() => establecerCategoria(id)}
            className="fs-5 pe-5  d-flex align-items-center  py-1  bg-white bg-hoverdark position-relative ">
            <div className="position-relative d-flex align-items-center">
                <p className="m-0 fw-normal text-secondary ">{PrimeraLetraMayusculaUtils(nombre)}</p>

                {
                    verificarCategoriaSeleccionada &&
                    <i
                        style={{ right: "-30px" }}
                        className="fa-solid z-1 fa-check color-rosa position-absolute text-end  mx-2" />
                }
            </div>
        </Dropdown.Item>
    )
})

export const FiltradoPorCategorias = ({
    establecerCategoria,
    categoria
}) => {
    return (
        <Dropdown
            style={{ backgroundColor: "#57BDC6" }}
            className="mx-1 h-100 rounded-2">
            <Dropdown.Toggle
                id="dropwdown-categorias"
                variant="none"
                className="d-flex  py-2 text-white h-100 ">
                <i className="fa-solid fs-5 fa-filter"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
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