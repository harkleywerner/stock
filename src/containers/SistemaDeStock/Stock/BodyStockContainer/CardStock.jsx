import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { establecerStockInfo } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { lazy } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AlertaDePendientes = lazy(() => import("./AlertaDePendientes"))

export const CardStock = ({
    lote,
    total_absoluto,
    total_relativo,
    id_stock,
    fecha
}) => {

    const { stock_info = {} } = useSelector(state => state.gestion_stock)

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { cambios_pendientes } = stock_info

    const fechaDate = new Date(fecha)

    const dispatch = useDispatch()

    const day = fechaDate.getDate()
    const mes = fechaDate.getMonth() + 1
    const año = fechaDate.getFullYear()

    const nav = useNavigate()

    const redirectStock = () => {
        nav(`/stock/gestion`)
        if (id_stock !== stock_info.id_stock) {
            dispatch(establecerStockInfo({ id_stock, lote }))
        }
    }

    const onClick = () => {
        if (cambios_pendientes > 0 && id_stock != stock_info.id_stock) {
            alternarMostrar()
        } else {
            redirectStock()
        }
    }

    return (
        <>
            <Card
                onClick={onClick}
                className="m-4 transition overflow-hidden cursor-pointer"
                style={{ width: '17rem', height: "15rem" }}>
                       <Card.Header className="d-flex bg-white border-0 align-items-center justify-content-between">
                        <Card.Title
                            className="fs-2"
                            style={{ color: "#814937" }}>#{lote}</Card.Title>
                        <Card.Subtitle className=" text-muted">{day}/{mes}/{año}</Card.Subtitle>
                    </Card.Header>
                <Card.Body className="h-100 d-flex flex-column">

                    <Card.Footer className="d-flex border-0 bg-white justify-content-end align-items-end h-100">
                        <p className="m-0 fs-5 text-end text-secondary">
                            {total_relativo}/{total_absoluto} items
                        </p>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <SuspenseLoadingComponent>
                <AlertaDePendientes
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar}
                    stock_info={stock_info}
                    redirectStock={redirectStock}
                />
            </SuspenseLoadingComponent>
        </>

    );
};