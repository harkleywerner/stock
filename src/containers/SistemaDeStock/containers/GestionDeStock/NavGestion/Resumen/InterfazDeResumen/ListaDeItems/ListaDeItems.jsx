import { useAcordion } from "@/hooks//useAcordion.hook"
import { pipeUtils } from "@/utils/pipe.utils"
import FiltradoSincronizaciones from "./FiltradoSincronizaciones"
import Items from "./items/Items"
import OrdenItems from "./OrdenItems"
import { useChangeOrder } from "./hooks/useChangeOrder.hook"
import { useFiltradoSincronizacion } from "./hooks/useFiltradoSincronizacion.hook"


const ListadoDeItems = ({ resumen }) => {

    const { onChangeOrder, order, orderByListaDeCambios } = useChangeOrder()

    const { accordion, establecerAccordion } = useAcordion()

    const { onHandleSincronizacion, sincronizacion, filterByListaDeCambios } = useFiltradoSincronizacion()

    const pipe = pipeUtils(orderByListaDeCambios, filterByListaDeCambios)([...resumen])

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
                pipe.map((i, index) =>
                    <Items
                        id={index}
                        establecerAccordion={establecerAccordion}
                        openAccordion={accordion.includes(index)}
                        key={index}
                        {...i}
                    />)
            }
        </section>
    )
}

export default ListadoDeItems