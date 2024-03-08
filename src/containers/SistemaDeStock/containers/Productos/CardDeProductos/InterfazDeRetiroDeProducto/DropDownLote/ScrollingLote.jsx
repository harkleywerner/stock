import SpinnerLoader from "@/components//SpinnerLoader";
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor";
import { useForm } from "@/hooks//useForm";
import { memo, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import ScrollingInfinite from "../../../../components/ScrollingInfinite";
import ListaDeLotes from "./ListaDeLotes";
import { scrollingHelper } from "./helpers/scrolling.helper";

const BuscadorDeLote = ({ lote, changeForm }) => {

    return (
        <Form.Control
            name="lote"
            value={lote}
            onChange={changeForm}
            type="text"
            autoComplete="off"
            className="text-secondary"
        >
        </Form.Control>
    )
}

const ScrollingLote = ({
    apiData,
    loader,
    generatePromise,
    removerApiData,
    id_producto,
}) => {

    const { changeForm, form } = useForm({ lote: "" })

    const { lote } = form

    const elementoToObserver = useRef(null)

    const { tipo, data = [] } = apiData["stock/lote"] || {}

    const apiCall = scrollingHelper({ data, generatePromise, lote, removerApiData, id_producto })

    const loaderCustom =
        <SpinnerLoader size="sm"
            position="centered"
            color="dark" />

    return (
        <ScrollingInfinite
            ref={elementoToObserver}
            loaderComponent={loaderCustom}
            ApiCall={apiCall}
            dataLength={data.length}
            step={15}
        >
            <ul
                ref={elementoToObserver}
                style={{ maxHeight: "200px", minHeight: "60px" }}
                className="dropdown-menu  scrollbar ">
                <li className="dropdown-item bg-white">
                    <BuscadorDeLote
                        changeForm={changeForm}
                        lote={lote} />
                </li>
                {
                    data.length == 0 && tipo == "success" && !loader &&
                    <li className="text-center text-secondary dropwdown-item">
                        <small>No hay hay ningun lote</small>
                    </li>

                }
                {
                    loader ? <span className="my-3 d-flex">{loaderCustom}</span> :
                        <ListaDeLotes
                            id_producto={id_producto}
                            data={data}
                        />

                }
            </ul>

        </ScrollingInfinite >
    );
}


export default wrapperNotificacionesServidor(memo(ScrollingLote))