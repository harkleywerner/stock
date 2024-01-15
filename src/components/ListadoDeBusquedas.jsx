import { useCallback, useEffect } from "react"
import { Collapse, Stack } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import { useAlternarComponentes } from "../hooks/useAlternarComponentes"

const Listado = ({ nombre, onSearch }) => {

    return (
        <Stack
            direction="horizontal"
            onClick={() => onSearch(nombre)}
            className="p-1 bg-hoverdark  bg-white cursor-pointer">
            <i style={{ background: "#F0F2F5", padding: "10px" }}
                className="fa-solid mx-1 rounded-circle text-ligthdark fa-magnifying-glass"></i>
            <p className="m-0 text-ligthdark fw-medium bg-hoverdark w-100 border-2 bo p-2 ls-4 text-truncate">{nombre}</p> {/* Aca va el children con un formate diferente para cada tipo de busqueda */}

        </Stack>
    )
}

const listado2 = [
    { nombre: "f" },
    { nombre: "g" },
    { nombre: "h" },
    { nombre: "r" },
    { nombre: "s" },
    { nombre: "z" },
    { nombre: "t" },
    { nombre: "u" },
    { nombre: "yus" },
    { nombre: "yuf" },
    { nombre: "yug" },
    { nombre: "yuh" },
    { nombre: "yuj" },
]

export const ListadoDeBusquedas = ({ listado = listado2, mostrar2 }) => {

    const [search, setSearch] = useSearchParams()
    const searching = search.get("search")

    const onSearch = useCallback((seleccionado) => {
        setSearch(`?selectSearch=${seleccionado}`)
    }, [])


 

    return (
        <Collapse
            className=" shadow w-100 scrollbar  rounded-4"
            in={searching}
            dimension={"width"} >
            <div
                style={{ minHeight: "100px", maxHeight: "350px", top: "102%", zIndex: "33333" }}
                className="bg-white  position-absolute  ">

                {
                    listado.length > 0 ?
                        listado.map(item =>
                            <Listado
                                onSearch={onSearch}
                                key={item.nombre}
                                nombre={item.nombre} />
                        )
                        :
                        <div
                            style={{ minHeight: "100px" }}
                            className="text-ligthdark d-flex justify-content-center align-items-center h-100 ">
                            <p className="m-0 mx-1 ls-4 fw-medium">No se encontraron coincidencias de "{searching}" :'C</p>
                        </div>
                }

            </div>
        </Collapse>
    )
}