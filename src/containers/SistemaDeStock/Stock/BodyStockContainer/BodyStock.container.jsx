import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { memo, useRef } from "react";
import { Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ScrollingInfinite from "../../containers/components/ScrollingInfinite";
import { CardStock } from "./CardStock";
import scrollingStockHelper from "./helpers/scrollingStock.helper";


const Message = memo(({ getSearch }) => {
  return (
    <p className="text-white w-100   text-center h-100 d-flex align-items-center  justify-content-center text-center fs-5">No se encontro ningun lote "#{getSearch}"...</p>
  )
})

const StockContainer = ({
  generatePromise,
  apiData,
  loader,
  removerApiData
}) => {

  const [search] = useSearchParams()

  const getSearch = search.get("search") || ""

  const { tipo, data = [] } = apiData["stock"] || {}

  const apiCall = scrollingStockHelper({ dataLength: data.length, generatePromise, removerApiData,getSearch})

  const elementToObserve = useRef(null)

  return (
    <Col className="p-0 h-100 d-flex">
      {
        data.length == 0 ?

          tipo == "success" && !loader ? <Message getSearch={getSearch} /> : <SpinnerLoader position="centered" /> :

          <ScrollingInfinite
            ApiCall={apiCall}
            dataLength={data.length}
            ref={elementToObserve}
            step={15}>
            <section
              className="justify-content-center px-1 align-content-start align-items-center flex-wrap d-flex"
              ref={elementToObserve}>
              {
                data.map(item => <CardStock key={item.id_stock} {...item} />)
              }
            </section>
          </ScrollingInfinite>
      }
    </Col>

  );
};

export default wrapperNotificacionesServidor(StockContainer)