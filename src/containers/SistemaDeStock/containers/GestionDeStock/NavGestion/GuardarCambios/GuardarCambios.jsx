import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { Suspense, lazy } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Guardar } from "./Guadar";
import { stockEntranteHelper } from "./helper/stockEntrante.helper";
import { subirStockHelper } from "./helper/subirStock.helper";

const Sincronizar = lazy(() => import("./Sincronizar"))

const GuardarCambios = (
    {
        loader,
        apiData,
        generatePromise
    }

) => {
    const { stock, inicializado, stock_data_base = [], stock_info } = useSelector(state => state.gestion_stock)

    const { lote, id_stock, sync_pendientes = 0, cambios_pendientes = 0 } = stock_info

    const stockGestion = apiData["stock/gestion"] || {}

    stockEntranteHelper({ loader, stockGestion, stock_data_base, lote,stock})

    const subirStock = subirStockHelper({ inicializado, generatePromise, stock, stock_data_base, id_stock,cambios_pendientes })

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
                        {
                            sync_pendientes > 0 ? <Suspense><Sincronizar sync_pendientes={sync_pendientes} /> </Suspense> : <Guardar cambios_pendientes={cambios_pendientes} />
                        }

                    </Nav.Item>
            }
        </>
    )
};

export default wrapperNotificacionesServidor(GuardarCambios)