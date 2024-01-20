import { Dropdown } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"

const categorias = [
    { id: 1, nombre: "cremas" },
    { id: 2, nombre: "dulce de leche" },
    { id: 3, nombre: "al agua" },
    { id: 4, nombre: "chocolate" },
    { id: 5, nombre: "tortas" },
]

const DropdownItems = ({ nombre }) => {

    const [search, setSearch] = useSearchParams()

    const onClick = () => {
        search.delete("categoria")
        search.append("categoria", nombre)
        setSearch(`?${search.toString()}`)
    }

    return (
        <Dropdown.Item
            onClick={onClick}
            className="fs-5 pe-5  d-flex align-items-center  py-1  bg-white bg-hoverdark position-relative ">
            <div className="position-relative d-flex align-items-center">
                <p className="m-0 fw-normal text-secondary ">{nombre}</p>

                {
                    nombre == search.get("categoria") &&
                    <i
                        style={{ right: "-30px" }}
                        className="fa-solid z-1 fa-check color-rosa position-absolute text-end  mx-2" />
                }
            </div>
        </Dropdown.Item>


    )
}

const RemoverFiltros = () => {

    const [search, setSearch] = useSearchParams()

    const onClick = () => {
        search.delete("categoria")
        setSearch(`?${search.toString()}`)
    }

    return (
        <Dropdown.Item
            onClick={onClick}
            className="bg-white">
            <p className="m-0 text-center bg-hoverdark hover-rosa zoom  fs-5">Borrar filtros</p>
        </Dropdown.Item>
    )
}

export const DropDownFilterCategoria = () => {

    return (
        <Dropdown autoClose="outside" >
            <Dropdown.Toggle variant="none" className="d-flex text-white hover-rosa fs-5 transition border-0 align-items-center">
                <i className="fa-solid mx-1 fa-filter"></i>
                <p className="m-0 fw-normal ">Filtrar por</p>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
                {
                    [...categorias,].map(item =>
                        <DropdownItems
                            key={item.id}
                            nombre={item.nombre} />)
                }
                <Dropdown.Divider />
                <RemoverFiltros />
            </Dropdown.Menu>

        </Dropdown>
    )
}

