import ScrollingInfinite from "@/containers//SistemaDeStock/Components/ScrollingInfinite"
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes"
import { useForm } from "@/hooks//useForm"
import { usePromiseHandler } from "@/hooks//usePromiseHandler"
import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones"
import axios from "axios"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Form, Stack } from "react-bootstrap"
import { FiltradoPorCategorias } from "./FiltradoPorCategorias"

const Listado = ({ insertarParametros, item }) => {

    const { nombre } = item

    const onClick = () => {
        insertarParametros(item)
    }

    return (
        <Stack
            onClick={onClick}
            direction="horizontal"
            className=" bg-hoverdark py-1 bg-white cursor-pointer">
            <i style={{ background: "#57BDC6", padding: "6px" }}
                className="fa-solid mx-1 rounded-circle text-white text-ligthdark fa-magnifying-glass"></i>
            <p className="m-0 fw-normal bg-hoverdark w-100 p-2  text-truncate font">{nombre}</p>
        </Stack>
    )
}

const ResultadosDeBusqueda = wrapperNotificaciones(memo(({
    buscador,
    insertarParametros,
    mostrar,
    establecerAlerta,
    categoria
}) => {


    const cancelSoruce = axios.CancelToken.source()

    const refListado = useRef(null)

    const listaDePromesas = [
        { method: "POST", url: `/productos`, id: "productos", data: { buscador, categoria }, cancelToken: cancelSoruce.token }]

    const { data, loader, obtenerDatos, removerData } = usePromiseHandler({ establecerAlerta })

    const { productos = [] } = data

    useEffect(() => {

        if (productos.length > 0) {
            removerData({ id: "productos" })
        }

        const timeoutSearch = setTimeout(() => {

            obtenerDatos({ promesa: listaDePromesas })

        }, 600);

        return () => {
            clearTimeout(timeoutSearch)
            cancelSoruce.cancel()
        }
    }, [buscador, categoria])

    const nuevoPromesa = [{ ...listaDePromesas[0], data: { ...listaDePromesas[0].data, offset: productos.length } }]


    return (

        <div
            style={{ minHeight: "200px", display: mostrar ? "flex" : "none", top: "100%" }}
            className="position-absolute z-1  w-100 h-100 bg-white shadow" >
            <ScrollingInfinite
                dataLength={productos.length}
                loader={{ loaderStatus: loader, color: "dark", size: "md" }}
                elementToObserve={refListado}
                step={15}
                style={{ maxHeight: "200px", minHeight: "200px" }}
                ApiCall={() => obtenerDatos({ promesa: nuevoPromesa })}>
                <section
                    ref={refListado}
                    className="m-0  p-0 d-block w-100 justify-content-start ">
                    {
                        productos.length == 0 && buscador.length > 0 && loader ?
                            <p
                                style={{ top: "0%" }}
                                className="m-0 position-absolute text-center d-flex justify-content-center align-items-center h-100 w-100 text-secondary text-center fs-5">No se encontro ningun item...</p> :
                            productos.map(item =>
                                <Listado
                                    insertarParametros={insertarParametros}
                                    key={item.id_producto}
                                    item={item}
                                />)
                    }
                </section>
            </ScrollingInfinite>
        </div>
    )
}))

export const BuscadorItem = memo(({ insertarParametros }) => {

    const { changeForm, form } = useForm({ buscador: "" })

    const [categoria, setCategoria] = useState()

    const establecerCategoria = useCallback((id) => {
        setCategoria(prev => id !== prev ? id : undefined)
    }, [])


    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const onBlur = () => {
        const timeOut = setTimeout(() => {
            alternarMostrar(false)
        }, 300)

        return () => clearTimeout(timeOut)
    }

    return (
        <section className="h-100 w-100 d-flex align-items-center justify-content-center">

            <FiltradoPorCategorias
                establecerCategoria={establecerCategoria}
                categoria={categoria} />

            <div className="position-relative w-75 ">
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
                    buscador={form.buscador}
                    categoria={categoria}
                />
            </div>
        

        </section>
    )
})
