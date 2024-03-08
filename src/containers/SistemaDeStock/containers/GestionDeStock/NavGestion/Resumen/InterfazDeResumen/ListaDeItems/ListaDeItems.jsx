import { useAcordion } from "@/hooks//useAcordion.hook"
import { pipeUtils } from "@/utils/pipe.utils"
import FiltradoSincronizaciones from "./FiltradoSincronizaciones"
import Items from "./Items"
import OrdenItems from "./OrdenItems"
import { useChanderOrder } from "./hooks/useChanderOrder.hook"
import { useFiltradoSincronizacion } from "./hooks/useFiltradoSincronizacion.hook"


const ListadoDeItems = ({ historial }) => {

    const { onChangeOrder, order, orderByListaDeCambios } = useChanderOrder()

    const { accordion, establecerAccordion } = useAcordion()

    const { onHandleSincronizacion, sincronizacion, filterByListaDeCambios } = useFiltradoSincronizacion()

    const pipe = pipeUtils(orderByListaDeCambios, filterByListaDeCambios)([...historial])

    return (
        <section className="h-100">
            <div className="d-flex mb-3 justify-content-between mx-1">
                <FiltradoSincronizaciones
                    sincronizacion={sincronizacion}
                    onHandleSincronizacion={onHandleSincronizacion}
                />
                <OrdenItems
                    order={order}
                    onChangeOrder={onChangeOrder} />
            </div>
            {
                pipe.map(i =>
                    <Items establecerAccordion={establecerAccordion}
                        openAccordion={accordion.includes(i.id_producto)}
                        key={i.id_detalle_de_stock} {...i} />)
            }
        </section>
    )
}

export default ListadoDeItems