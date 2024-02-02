import { useAlternarComponentes } from "@/hooks//useAlternarComponentes"
import { useForm } from "@/hooks//useForm"
import { useLoaderPromesas } from "@/hooks//useLoaderPromesas"
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones"
import axios from "axios"
import { memo, useEffect, useState } from "react"
import { Collapse, Form, Spinner, Stack } from "react-bootstrap"



const Listado = ({ insertarParametros, item }) => {

    const { nombre } = item

    const onClick = () => {
        insertarParametros(item)
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

const ResultadosDeBusqueda = wrapperNotificaciones(memo(({ buscador, insertarParametros, mostrar, establecerAlerta }) => {

    const cancelSoruce = axios.CancelToken.source()

    const listaDePromesas = [
        { method: "POST", url: `/productos`, id: "productos", data: { buscador }, cancelToken: cancelSoruce.token }]

    const { data, loader, obtenerDatos } = useLoaderPromesas({ establecerAlerta, listaDePromesas })

    const { productos = [] } = data

    useEffect(() => {

        if (!loader && buscador.length == 0 && Object.keys(data).length == 0) return //=> en caso de primer renderizado.

        const timeoutSearch = setTimeout(() => {

            obtenerDatos({ promesa: listaDePromesas })

        }, 600);

        return () => {
            clearTimeout(timeoutSearch)
            cancelSoruce.cancel()
        }
    }, [buscador])


    return (
        <Collapse
            className={`${!mostrar ? "d-none" : ""} z-1 shadow w-100 rounded-4 `}
            in={true}
            dimension={"width"} >
            <div
                style={{ minHeight: "100px", maxHeight: "250px", left: "0%" }}
                className="bg-white scrollbar w-100 border position-absolute">
                {
                    productos.length > 0 && loader ?
                        productos.map(item =>
                            <Listado
                                insertarParametros={insertarParametros}
                                key={item.id_producto}
                                item={item}
                            />
                        )
                        :
                        <div
                            style={{ minHeight: "100px" }}
                            className="text-ligthdark d-flex justify-content-center align-items-center h-100 ">
                            {
                                loader ? <p className="m-0 mx-1">No se encontraron coincidencias...</p> : <Spinner></Spinner>
                            }
                        </div>
                }
            </div>

        </Collapse>
    )
}))

export const BuscadorItem = memo(({ insertarParametros }) => {

    const { changeForm, form } = useForm({ buscador: "" })


    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const onBlur = () => {
        const timeOut = setTimeout(() => {
            alternarMostrar(false)
        }, 200)

        return () => clearTimeout(timeOut)
    }

    return (
        <>
            <Form.Control
                onFocus={() => alternarMostrar(true)}
                onBlur={onBlur}
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
                mostrar={mostrar}
                insertarParametros={insertarParametros}
                buscador={form.buscador} />

        </>
    )
})
