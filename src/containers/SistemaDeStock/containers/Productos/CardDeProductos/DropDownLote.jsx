import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor";
import { Dropdown, Form } from "react-bootstrap";
import ScrollingInfinite from "../../components/ScrollingInfinite";
import { memo, useEffect, useRef } from "react";
import { useForm } from "@/hooks//useForm";
import axios from "axios";
import SpinnerLoader from "@/components//SpinnerLoader";


const BuscadorDeLote = ({ lote, changeForm }) => {


    return (
        <Form.Control
            name="lote"
            value={lote}
            onChange={changeForm}
            type="text"
            autoComplete="off"
        >

        </Form.Control>
    )
}

const ListaDeLotesItems = ({ lote }) => {
    return (
        <li className="dropdown-item text-center border-bottom"># {lote}</li>
    )
}

const DropDownLote = memo(({
    apiData,
    loader,
    generatePromise,
    removerApiData,
    id_producto
}) => {

    const { changeForm, form } = useForm({ lote: "" })

    const { lote } = form

    const cancelToken = axios.CancelToken.source()

    const elementoToObserver = useRef(null)

    const { tipo, data = [] } = apiData["stock/lote"] || {}

    const apiCall = (reset) => {

        const promesa = {
            method: "POST",
            url: "stock",
            id: "stock/lote",
            concatenate: true,
            data: { offset: reset ?? data.length, id_producto, lote },
            cancelToken: cancelToken.token,
        }
        generatePromise({ promesas: [promesa] })
    }

    useEffect(() => {

        if (data.length > 0) {
            removerApiData({ id: "stock/lote" })
        }

        const timeOut = setTimeout(() => {
             apiCall(0)
        }, 300);

        return () => {
            clearTimeout(timeOut)
            cancelToken.cancel()
        }
    }, [lote])


    const loaderCustom = <SpinnerLoader size="sm" position="centered" color="dark" />

    return (
        <div className="dropdown">
            
            <button
                type="button"
                style={{ maxWidth: "230px", minWidth: "200px" }}
                className="btn btn-dark d-flex align-items-center justify-content-between dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className="fa-solid text-secondary fs-5 fa-box-open"></i>
                <span className="m-0 text-truncate">Lote #!</span>
            </button>

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
                    className="dropdown-menu scrollbar">
                    <li className="dropdown-item bg-white">
                        <BuscadorDeLote
                            changeForm={changeForm}
                            lote={lote} />
                    </li>
                    {
                        data.length == 0 && tipo == "success" && !loader &&
                         <li className="text-center">No hay hay ningun lote</li>
                        
                    }
                    {
                        loader ? <span className="my-3 d-flex">{loaderCustom}</span> :
                            data.map(item => <ListaDeLotesItems key={item.id_stock} {...item} />)

                    }
                </ul>

            </ScrollingInfinite>
            
            
        </div>
    );
})

export default wrapperNotificacionesServidor(DropDownLote)