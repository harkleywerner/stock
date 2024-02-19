import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Guardar } from "./Guadar";
import { calcularStockSalienteHelper } from "./helper/calcularStockSaliente.helper";
import { subirStockHelper } from "./helper/subirStock.helper";
import { verificarTipoHelper } from "./helper/verificarTipo.helper";
import { Suspense, lazy } from "react";

const Sincronizar = lazy(() => import("./Sincronizar"))

const GuardarCambios = (
    {
        loader,
        data: dataFecth,
        generatePromise
    }

) => {
    const { stock, inicializado, stock_data_base = [], stock_info } = useSelector(state => state.gestion_stock)

    const { lote, id_stock,sync_pendientes } = stock_info

    const stockGestion = dataFecth["stock/gestion"] || {}

    const cambios = calcularStockSalienteHelper({ stock, stock_data_base })

    verificarTipoHelper({ loader, stockGestion, stock_data_base, lote })

    const subirStock = subirStockHelper({ inicializado, generatePromise, cambios, id_stock })

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
                            sync_pendientes > 0 ? <Suspense><Sincronizar sync_pendientes={sync_pendientes} /> </Suspense> : <Guardar cambios={cambios.length} />
                        }

                    </Nav.Item>
            }
        </>
    )
};

export default wrapperNotificacionesServidor(GuardarCambios)