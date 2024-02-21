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

    const { sync_pendientes, cambios_pendientes } = stock_info

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
        if (sync_pendientes > 0 || cambios_pendientes > 0 && id_stock != stock_info.id_stock) {
            alternarMostrar()
        } else {
            redirectStock()
        }
    }
    
    return (
        <>
            <Card
                onClick={onClick}
                className="m-4 transition cursor-pointer"
                style={{ width: '17rem', height: "15rem" }}>
                <Card.Body>
                    <Card.Title
                        className="text-center"
                        style={{ color: "#814937" }}>Lote #{lote}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Ingreso : {day}/{mes}/{año}</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Card.Footer className="">
                        <p className="m-0 text-end text-secondary">
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