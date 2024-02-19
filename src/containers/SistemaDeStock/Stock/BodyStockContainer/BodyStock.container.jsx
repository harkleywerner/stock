import { Col } from "react-bootstrap";
import ScrollingInfinite from "../../containers/components/ScrollingInfinite";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { useEffect, useRef } from "react";
import { CardStock } from "./CardStock";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const StockContainer = ({
  generatePromise,
  data,
  loader,
  removerData
}) => {

  const [search] = useSearchParams()

  const getLote = search.get("search")

  const cancelSoruce = axios.CancelToken.source()

  const elementToObserve = useRef(null)

  const stocksContainer = data["stock"] || []

  const promesa =
  {
    method: "GET", url: `/stock`, id: "stock",
    params: { search: getLote, offset: 0 },
    cancelToken: cancelSoruce.token,
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
      cancelSoruce.cancel()
    }

  }, [getLote])

  return (
    <Col className="p-0">
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
    </Col>

  );
};

export default wrapperNotificacionesServidor(StockContainer)