import { Col } from "react-bootstrap";
import ScrollingInfinite from "../../containers/components/ScrollingInfinite";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { memo, useEffect, useRef } from "react";
import { CardStock } from "./CardStock";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SpinnerLoader from "@/components//SpinnerLoader";


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

  const cancelSource = axios.CancelToken.source()

  const elementToObserve = useRef(null)

  const { tipo, data = [] } = apiData["stock"] || {}

  const apiCall = (reset) => {

    const promesa =
    {
      method: "GET", url: `/stock`, id: "stock",
      params: { search: getSearch, offset: reset ?? data.length },
      cancelToken: cancelSource.token,
      concatenate: true
    }

    generatePromise({ promesas: [promesa] })
  }

  useEffect(() => {

    removerApiData({ id: "stock" })

    const timeOut = setTimeout(() => {

      apiCall(0)

    }, 600);

    return () => {
      clearTimeout(timeOut)
      cancelSource.cancel()
    }

  }, [getSearch])


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