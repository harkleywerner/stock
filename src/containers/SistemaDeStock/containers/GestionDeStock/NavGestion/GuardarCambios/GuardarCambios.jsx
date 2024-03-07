import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { establecerPendientes, sincronizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { useEffect } from "react";
import { Badge, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calcularStockEntranteHelper } from "./helper/calculalStockEntrante.helper";
import { calcularStockSalienteHelper } from "./helper/calcularStockSaliente.helper";
import { subirStockHelper } from "./helper/subirStock.helper";

const GuardarCambios = (
    {
        loader,
        apiData,
        generatePromise
    }

) => {

    const dispatch = useDispatch()

    const { stock, inicializado, stock_data_base = [], stock_info } = useSelector(state => state.gestion_stock)

    const { id_stock = 0, cambios_pendientes } = stock_info

    const { tipo, data = {} } = apiData["stock/gestion"] || {}

    const { contador_de_cambios, cambios, } = calcularStockSalienteHelper({ stock, stock_data_base })

    const subirStock = subirStockHelper({
        inicializado,
        generatePromise,
        id_stock,
        contador_de_cambios,
        cambios,
    })

    useEffect(() => {

        return () => {
            if (contador_de_cambios != cambios_pendientes) {
                dispatch(establecerPendientes({ cambios_pendientes: contador_de_cambios }))
            }
        }

    }, [contador_de_cambios])

    useEffect(() => {

        if (tipo == "success" && !loader) {
            const { nuevoStock } = calcularStockEntranteHelper({ stock, stock_data_base, data })
            dispatch(sincronizarStock(nuevoStock))
        }

    }, [loader])

    return (
        <>
            {
                loader ? <SpinnerLoader
                    size="sm"
                    position="y" /> :

                    <Nav.Item
                        onClick={subirStock}
                        className={`
                      ${inicializado ? " transition cursor-pointer" : "opacity-50 cursor-block"}
                      fs-5  p-1 justify-content-center  d-flex align-items-center `}>
                        <div className="d-flex align-items-center">
                            <Badge
                                style={{ minWidth: "25px", maxWidth: "25px" }}
                                bg="info"
                                className="fs-5 p-1">{contador_de_cambios}</Badge>
                            <p className="m-0 fw-normal mx-1">Guardar Cambios</p>
                            <i className="fa-solid fs-4 fa-cloud-arrow-down"></i>
                        </div>
                    </Nav.Item>
            }
        </>
    )
};

export default wrapperNotificacionesServidor(GuardarCambios)