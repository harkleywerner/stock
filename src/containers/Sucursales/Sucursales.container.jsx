import SpinnerLoader from "@/components//SpinnerLoader";
import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { lazy, memo, useEffect } from "react";
import { Col } from "react-bootstrap";
import { CardDeSucursales } from "./CardSucursales/CardDeSucursales";
import { useDispatch } from "react-redux";


const InterfazDeLogeo = lazy(() => import("./CardSucursales/InterfazDeLogeo/InterfazDeLogeo"))

const ListaDeCards = ({
    nombre,
    id_sucursal,
    total_usuarios
}) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()
    return (
        <>
            <CardDeSucursales
                alternarMostrar={alternarMostrar}
                nombre={nombre}
                total_usuarios={total_usuarios}
            />
            <SuspenseLoadingComponent>
                {
                    mostrar &&
                    <InterfazDeLogeo
                        alternarMostrar={alternarMostrar}
                        mostrar={mostrar}
                        nombre={nombre}
                        id_sucursal={id_sucursal} />
                }
            </SuspenseLoadingComponent>
        </>
    )
}

export const SucursalesContainer = wrapperNotificacionesServidor(memo(({
    generatePromise,
    apiData,
    loader
}) => {

    const dispatch = useDispatch()

    const { sucursales = {} } = apiData

    const { data = [] } = sucursales

    const apiCall = () => {
        const promesa = {
            method: "GET",
            url: "sucursales",
            id: "sucursales"
        }
        generatePromise({ promesa })
    }

    useEffect(() => {
        dispatch({ type: "store/reset" })
        apiCall()
    }, [])

    return (

        <Col className="p-0 h-100 scrollbar  flex-wrap d-flex align-content-start align-items-center justify-content-center">
            {
                loader ?
                    <div className="d-flex h-100">
                        <SpinnerLoader size="lg" position="centered" />
                    </div> :
                    data.map(i => <ListaDeCards key={i.id_sucursal} {...i} />)
            }

        </Col>

    )
}))