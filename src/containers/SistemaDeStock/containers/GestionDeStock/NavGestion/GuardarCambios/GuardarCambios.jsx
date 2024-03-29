import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { establecerPendientes, sincronizarStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { useEffect } from "react";
import { Badge, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calcularStockEntranteHelper } from "./helper/calculalStockEntrante.helper";
import { calcularStockSalienteHelper } from "./helper/calcularStockSaliente.helper";
import { subirStockHelper } from "./helper/subirStock.helper";
import { generarToast } from "@/store//reducer/toastNotificaciones/toastNotificaciones.slice";

const GuardarCambios = (
    {
        loader,
        apiData,
        generatePromise
    }

) => {

    const dispatch = useDispatch()

    const { stock, inicializado, stock_data_base = [], stock_info } = useSelector(state => state.gestion_stock)

    const { id_stock, cambios_pendientes } = stock_info

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
        if (contador_de_cambios != cambios_pendientes && id_stock) {
            dispatch(establecerPendientes({ cambios_pendientes: contador_de_cambios }))
        }
    }, [contador_de_cambios])

    useEffect(() => {

        if (tipo == "success" && !loader && id_stock) {
            const { nuevoStock, resumen } = calcularStockEntranteHelper({ stock, stock_data_base, data })

            if (resumen.some(i => /info|failed/.test(i.sincronizacion))) {
                dispatch(generarToast({ texto: "Algunos cambios no fueron almacenados, verifique el resumen.", tipo: "danger" }))
            } else {
                dispatch(generarToast({ texto: "Cambios guardados.", tipo: "success" }))
            }

            dispatch(sincronizarStock({ stock: nuevoStock, resumen }))
        }

    }, [loader])

    return (
        <Nav.Item
            onClick={() => tipo != "failed" && subirStock()}
            className={`
            resaltador
                      ${inicializado ? "  cursor-pointer" : "opacity-50 cursor-block"}
                      fs-5  p-1 justify-content-center  d-flex align-items-center `}>
            <div className="d-flex transition align-items-center">
                <Badge
                    bg="none"
                    style={{ minWidth: "26px", maxWidth: "30px", backgroundColor: `#86d4da` }}
                    className="fs-5 rounded-3  p-1">{contador_de_cambios}</Badge>
                <p className="m-0 fw-normal  mx-1">Guardar Cambios</p>

                {
                    loader ? <SpinnerLoader size="sm" /> : <i className="fa-solid  fs-4 fa-cloud-arrow-down"></i>
                }
            </div>
        </Nav.Item>
    )
};

export default wrapperNotificacionesServidor(GuardarCambios)

