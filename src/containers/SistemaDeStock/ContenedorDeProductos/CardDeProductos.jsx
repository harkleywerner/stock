import { Button, Card } from "react-bootstrap";
import styles from "@/styles/CardDeProductos.module.css"
import { memo } from "react";

const CardDeProductos = memo(({ alternarMostrar, item, listaDeRetirados }) => {

    const { nombre, cantidad_total } = listaDeRetirados || item

    const verificarCantidad = cantidad_total > 100 ? "99+" : cantidad_total

    return (
        <Card
            className={`m-3 transition  cursor-pointer shadow`}
            style={{ width: '18rem', opacity: "0.9", height: "7rem" }}>
            <Card.Title className=" m-0 d-flex justify-content-center p-1 ">
                <p
                    style={{ fontSize: "16px", minHeight: "40px", maxHeight: "40px" }}
                    className="m-0 w-75 border-bottom text-truncate text-center text-wrap d-flex align-items-center justify-content-center  fw-normal">{nombre}</p>
            </Card.Title>
            <Card.Body className="d-flex justify-content-between  align-items-center">
                <Button
                    onClick={alternarMostrar}
                    className={styles.cardButton}
                    variant="none">Retirar</Button>
                <p style={{ border: "1px solid #814937", color: "#555", width: "35px", height: "40px", letterSpacing: "0px" }}
                    className="m-0 fs-5 rounded-circle border-1 align-items-center d-flex justify-content-center  ">{verificarCantidad}</p>
            </Card.Body>
        </Card>
    );
})

export default CardDeProductos