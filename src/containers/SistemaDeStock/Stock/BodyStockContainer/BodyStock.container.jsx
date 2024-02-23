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
  data,
  loader,
  removerData
}) => {

  const [search] = useSearchParams()

  const getSearch = search.get("search") || ""

  const cancelSource = axios.CancelToken.source()

  const elementToObserve = useRef(null)

  const stocksContainer = data["stock"] || []

  const promesa =
  {
    method: "GET", url: `/stock`, id: "stock",
    params: { search: getSearch, offset: 0 },
    cancelToken: cancelSource.token,
    concatenate: true
  }

  useEffect(() => {

    if (stocksContainer.length > 0) {
      removerData({ id: "stock" })
    }

    const timeOut = setTimeout(() => {

      generatePromise({ promesas: [promesa] })

    }, 600);

    return () => {
      clearTimeout(timeOut)
      cancelSource.cancel()
    }

  }, [getSearch])

  const nuevoPromesa = [{ ...promesa, params: { ...promesa.params, offset: stocksContainer.length } }]

  return (
    <Col className="p-0 h-100 d-flex">
      {
        stocksContainer.length == 0 ?
        getSearch.length > 0 && !loader ? <Message getSearch = {getSearch}/> : <SpinnerLoader position="centered" /> :

          <ScrollingInfinite
            ApiCall={() => generatePromise({ promesas: nuevoPromesa })}
            dataLength={stocksContainer.length}
            ref={elementToObserve}
            step={15}>
            <section
              className="justify-content-center px-1 align-content-start align-items-center flex-wrap d-flex"
              ref={elementToObserve}>
              {
                stocksContainer.map(item => <CardStock key={item.id_stock} {...item} />)
              }
            </section>
          </ScrollingInfinite>
      }
    </Col>

  );
};

export default wrapperNotificacionesServidor(StockContainer)