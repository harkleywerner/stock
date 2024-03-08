import { Dropdown } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import { PrimeraLetraMayusculaUtils } from "@/utils/PrimeraLetraMayuscula.utils"

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

        const getCategoria = search.get("categoria")

        search.delete("categoria")

        if (getCategoria !== nombre) {
            search.append("categoria", nombre)
        }


        setSearch(`?${search.toString()}`)
    }

    return (
        <Dropdown.Item
            onClick={onClick}
            as={"li"}
            style={{ background: nombre == search.get("categoria") ? "#0cb1eb" : "#7CDAFD", borderBottom: "4px solid #0cb1eb" }}
            className="transition d-flex shadow  p-2  my-2 rounded-4">
            <p className="m-0 fw-normal text-secondary mx-auto text-white">{PrimeraLetraMayusculaUtils(nombre)}</p>
        </Dropdown.Item>


    )
}

export const DropDownFilterCategoria = () => {

    return (
        <Dropdown
            autoClose>
            <Dropdown.Toggle
                variant={"none"}
                className="d-flex text-white hover-rosa fs-5 transition border-0 align-items-center">
                <i className="fa-solid mx-1 fa-filter"></i>
                <p className="m-0 fw-normal ">Filtrar por</p>
            </Dropdown.Toggle>
            <Dropdown.Menu
                style={{ backgroundColor: "transparent" }}
                as={"ul"}
                className="position-absolute ms-3  border-0 p-1">
                {
                    [...categorias,].map(item =>
                        <DropdownItems
                            key={item.id}
                            nombre={item.nombre} />)
                }
            </Dropdown.Menu>

        </Dropdown>
    )
}

