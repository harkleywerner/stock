import { Button, Card } from "react-bootstrap";
import styles from "../Styles/CardDeProductos.module.css"
import { memo } from "react";

export const CardDeProductos = memo(({ nombre, cantidad, alternarMostrar }) => {



    return (
        <Card className="m-3 transition cursor-pointer shadow" style={{ width: '18rem', opacity: "0.9", height: "6.5rem" }}>
            <Card.Title className=" m-0 d-flex justify-content-center p-1">
                <p className="m-0 w-75 border-bottom text-nowrap text-truncate">Dulce de leche pauletti</p>
            </Card.Title>
            <Card.Body className="d-flex justify-content-between  align-items-center">
                <Button
                    onClick={alternarMostrar}
                    className={styles.cardButton}
                    variant="none">Editar</Button>
                <p style={{ border: "1px solid #814937", color: "#555" }} className="m-0 fs-4  rounded-circle border-2  px-1">44</p>
            </Card.Body>
        </Card>
    );
})