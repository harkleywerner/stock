import { pipeUtils } from "@/utils/pipe.utils"
import FiltradoSincronizaciones from "./FiltradoSincronizaciones"
import Items from "./Items"
import OrdenItems from "./OrdenItems"
import { useAccordionSincronizacion } from "./hooks/useAccordionSincronizacion.hook"
import { useChanderOrder } from "./hooks/useChanderOrder.hook"
import { useFiltradoSincronizacion } from "./hooks/useFiltradoSincronizacion.hook"


const ListadoDeItems = ({ listadoDeCambios }) => {

    const { onChangeOrder, order, orderByListaDeCambios } = useChanderOrder()

    const { onHandleSincronizacion, sincronizacion, filterByListaDeCambios } = useFiltradoSincronizacion()

    const { accordionId, onHandleAccordion } = useAccordionSincronizacion()

    const pipe = pipeUtils(orderByListaDeCambios, filterByListaDeCambios)([...listadoDeCambios])

    return (
        <section className="h-100">
            <div className="d-flex justify-content-between mx-1">
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
                    <Items onHandleAccordion={onHandleAccordion}
                        openAccordion={accordionId == i.id_producto}
                        key={i.id_detalle_de_stock} {...i} />)
            }
        </section>
    )
}

export default ListadoDeItems