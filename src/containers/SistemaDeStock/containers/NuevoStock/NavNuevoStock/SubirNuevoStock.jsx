import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { changeInicializado, removerStock } from "@/store//reducer/nuevoStock/nuevoStock.slice";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";
import { memo, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const SubirNuevoStock = (
    {
        loader,
        generatePromise,
        apiData
    }
) => {

    const { stock } = useSelector(state => state.nuevo_stock)

    const responseStock = apiData["stock/nuevo"] || {}


    const dispatch = useDispatch()

    const dispatchToast = (input) => dispatch(generarToast(input))

    useEffect(() => {
        if (Object.keys(responseStock).length > 0) {
            dispatchToast({ texto: `El lote #${responseStock.lote} se subio con exito`, tipo: "success" })
            dispatch(removerStock())
        }
    }, [JSON.stringify(responseStock)])

    const subirStock = () => {

        if (stock.length == 0) {
            dispatchToast({ texto: "No puedes subir un stock vacio", tipo: "warning" })
        }
        else {
            dispatch(changeInicializado())
            const promesa = { method: "POST", url: "stock/nuevo", data: { listaDeNuevoStock: stock }, id: "stock/nuevo"}
            generatePromise({ promesa })
        }
    }

    return (
        <>
            {
                loader ? <SpinnerLoader
                    position="y"
                    size="md" /> :
                    <Nav.Item
                        onClick={subirStock}
                        className="cursor-pointer hover-rosa resaltador  transition p-1 justify-content-center  d-flex align-items-center">
                        <p className="m-0 fw-normal fs-5 mx-1">Subir</p>
                        <i className="fa-solid fs-4 fa-cloud-arrow-up"></i>
                    </Nav.Item>
            }
        </>

    )
};

export default wrapperNotificacionesServidor(memo(SubirNuevoStock))