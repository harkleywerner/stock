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
    apiData,
    loader,
    alternarMostrar,
    generatePromise,
    removerApiData,
}) => {
    const cancelSource = axios.CancelToken.source()

    const refListado = useRef(null)

    const { data = [], tipo } = apiData["productos"] || {}

    const apiCall = (reset) => {

        const promesa =
        {
            method: "POST",
            url: `/productos`,
            id: "productos",
            data: { buscador, categoria, offset: reset ?? data.length },
            cancelToken: cancelSource.token,
            concatenate: true,
        }

        generatePromise({ promesas: [promesa] })
    }

    useEffect(() => {

        removerApiData({ id: "productos" })

        const timeoutSearch = setTimeout(() => {

            apiCall(0)

        }, 600);

        return () => {
            clearTimeout(timeoutSearch)
            cancelSource.cancel()
        }
    }, [buscador, categoria])

    const spinner = (<SpinnerLoader color="dark" position="centered" size="md" />)

    return (
        <div
            style={{ minHeight: "200px", top: "100%", border: "1px solid #57BDC67F" }}
            className="position-absolute z-1 d-flex  w-100 mt-1  rounded-4 overflow-hidden  h-100  bg-white shadow" >

            {
                data.length == 0 ?
                    !loader && tipo == "success" ? <Message /> : spinner :

                    <ScrollingInfinite
                        dataLength={data.length}
                        ref={refListado}
                        step={15}
                        loaderComponent={spinner}
                        ApiCall={apiCall}>
                        <section
                            ref={refListado}
                            className="m-0  p-0 d-block w-100 scrollbar  justify-content-start ">
                            {
                                data.map(item =>
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
