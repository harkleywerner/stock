import { Button, Card } from "react-bootstrap";
import styles from "@/styles/CardDeProductos.module.css"
import { memo } from "react";

const CardDeProductos = memo(({ alternarMostrar, item, insertarParametros, listaDeRetirados }) => {

    const { nombre, cantidad_total } = listaDeRetirados || item


    const onClick = () => {
        alternarMostrar(true)
        insertarParametros(item)
    }

    return (
        <Card
            className={`m-3 transition  cursor-pointer shadow`}
            style={{ width: '18rem', opacity: "0.9", height: "6.5rem" }}>
            <Card.Title className=" m-0 d-flex justify-content-center p-1">
                <p className="m-0 w-75 border-bottom text-nowrap text-truncate text-center  fw-normal">{nombre}</p>
            </Card.Title>
            <Card.Body className="d-flex justify-content-between  align-items-center">
                <Button
                    onClick={onClick}
                    className={styles.cardButton}
                    variant="none">Retirar</Button>
                <p style={{ border: "1px solid #814937", color: "#555", width: "30px", height: "35px" }}
                    className="m-0 fs-4 rounded-circle border-2 align-items-center d-flex justify-content-center  ">{cantidad_total}</p>
            </Card.Body>
        </Card>
    );
})

export default CardDeProductos