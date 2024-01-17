import { useAlternarComponentes } from "@/hooks//useAlternarComponentes"
import { useForm } from "@/hooks//useForm"
import { memo, useEffect } from "react"
import { Collapse, Form, Stack } from "react-bootstrap"

const listado2 = [
    { nombre: "323235dassa" },
    { nombre: "6" },
    { nombre: "1" },
    { nombre: "f" },
    { nombre: "gff" },
    { nombre: "h" },
    { nombre: "j" },
    { nombre: "9" },
    { nombre: "g" },
]

const Listado = ({ nombre, alternarMostrar, insertarParametros }) => {

    const onClick = () => {
        const test = { nombre, categoria: 3 }
        alternarMostrar()
        insertarParametros(test)
    }

    return (
        <Stack
            onClick={onClick}
            direction="horizontal"
            className=" bg-hoverdark  bg-white cursor-pointer">
            <i style={{ background: "#57BDC6", padding: "6px" }}
                className="fa-solid mx-1 rounded-circle text-white text-ligthdark fa-magnifying-glass"></i>
            <p className="m-0 fw-normal bg-hoverdark w-100 p-2  text-truncate font">{nombre}</p>
        </Stack>
    )
}

const ResultadosDeBusqueda = ({ buscador, listado = listado2, alternarMostrar, insertarParametros }) => {


    return (
        <Collapse
            className="z-1 shadow w-100 rounded-4  "
            in={buscador.length > 0 ? true : false}
            dimension={"width"} >

            <div
                style={{ minHeight: "100px", maxHeight: "250px", left: "0%" }}
                className="bg-white scrollbar w-100 border position-absolute">
                {
                    listado.length > 0 ?
                        listado.map(item =>
                            <Listado
                                insertarParametros={insertarParametros}
                                alternarMostrar={alternarMostrar}
                                key={item.nombre}
                                nombre={item.nombre} />
                        )
                        :
                        <div
                            style={{ minHeight: "100px" }}
                            className="text-ligthdark d-flex justify-content-center align-items-center h-100 ">
                            <p className="m-0 mx-1">No se encontraron coincidencias de {searching}</p>
                        </div>
                }
            </div>
        </Collapse>
    )
}

export const BuscadorItem = memo(({ insertarParametros }) => {

    const { changeForm, form } = useForm({ buscador: "" })

    const { alternarMostrar, mostrar } = useAlternarComponentes()


    useEffect(() => {

        changeForm({ target: { name: "buscador", value: "" } })

    }, [mostrar])

    return (
        <>
            <Form.Control
                className="font py-2 fs-5"
                name="buscador"
                type="search"
                placeholder="Buscar un item..."
                autoComplete="off"
                onChange={changeForm}
                value={form.buscador}
            >
            </Form.Control>
            <ResultadosDeBusqueda
                insertarParametros={insertarParametros}
                alternarMostrar={alternarMostrar}
                buscador={form.buscador} />
        </>
    )
})
