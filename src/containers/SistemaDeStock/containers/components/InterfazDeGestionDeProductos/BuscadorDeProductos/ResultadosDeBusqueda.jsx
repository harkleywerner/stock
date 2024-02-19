import axios from "axios"
import { memo, useEffect, useRef } from "react"
import ScrollingInfinite from "../../ScrollingInfinite"
import SpinnerLoader from "@/components//SpinnerLoader"
import { Stack } from "react-bootstrap"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"

const Listado = ({ insertarParametros, item, alternarMostrar }) => {

    const { nombre } = item

    const onClick = () => {
        alternarMostrar(false)
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

const Message = memo(() => {
    return (
        <p className="m-0  text-center d-flex justify-content-center align-items-center h-100 w-100 text-secondary text-center fs-5">
            No se encontro ningun item...
        </p>

    )
})

export const ResultadosDeBusqueda = wrapperNotificacionesServidor(memo(({
    buscador,
    insertarParametros,
    categoria,
    data,
    loader,
    alternarMostrar,
    generatePromise,
    removerData,
}) => {
    const cancelSoruce = axios.CancelToken.source()

    const refListado = useRef(null)

    const listaDePromesas = [
        { method: "POST", url: `/productos`, id: "productos", data: { buscador, categoria }, cancelToken: cancelSoruce.token, concatenate: true }]

    const { productos = [] } = data

    useEffect(() => {

        if (productos.length > 0) {
            removerData({ id: "productos" })
        }

        const timeoutSearch = setTimeout(() => {

            generatePromise({ promesas: listaDePromesas })

        }, 600);

        return () => {
            clearTimeout(timeoutSearch)
            cancelSoruce.cancel()
        }
    }, [buscador, categoria])

    const nuevoPromesa = [{ ...listaDePromesas[0], data: { ...listaDePromesas[0].data, offset: productos.length } }]

    const spinner = (<SpinnerLoader color="dark" position="centered" size="md" />)

    return (
        <div
            style={{ minHeight: "200px", top: "100%" }}
            className="position-absolute z-1 d-flex  w-100 h-100  bg-white shadow" >

            {
                productos.length == 0 ?
                    !loader && productos.length == 0 && buscador.length > 0 ? <Message /> : spinner :

                    <ScrollingInfinite
                        dataLength={productos.length}
                        ref={refListado}
                        step={15}
                        loaderComponent={spinner}
                        ApiCall={() => generatePromise({ promesas: nuevoPromesa })}>
                        <section
                            ref={refListado}
                            className="m-0  p-0 d-block w-100 scrollbar justify-content-start ">
                            {
                                productos.map(item =>
                                    <Listado
                                        alternarMostrar={alternarMostrar}
                                        insertarParametros={insertarParametros}
                                        key={item.id_producto}
                                        item={item}
                                    />)
                            }
                        </section>
                    </ScrollingInfinite>
            }
        </div>
    )
}))
