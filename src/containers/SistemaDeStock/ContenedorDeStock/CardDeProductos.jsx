import { Button, Card } from "react-bootstrap";
import styles from "@/styles/CardDeProductos.module.css"
import { memo, useEffect, useState } from "react";

 const CardDeProductos = memo(({ alternarMostrar, objecto, insertarParametros, contador = 0 }) => {

    const { id, nombre, cantidad } = objecto

    const onClick = () => {
        alternarMostrar(true)
        insertarParametros(objecto)
    }

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true);
        }, 1000 * (id / 19));

        return () => clearTimeout(timeout);
    }, []);


    return (
        <Card
            className={`m-3 transition  cursor-pointer shadow`}
            style={{ width: '18rem', opacity: "0.9", height: "6.5rem", visibility: `${visible ? "visible" : "hidden"}` }}>
            <Card.Title className=" m-0 d-flex justify-content-center p-1">
                <p className="m-0 w-75 border-bottom text-nowrap text-truncate text-center  fw-normal">{nombre}</p>
            </Card.Title>
            <Card.Body className="d-flex justify-content-between  align-items-center">
                <Button
                    onClick={onClick}
                    className={styles.cardButton}
                    variant="none">Retirar</Button>
                <p style={{ border: "1px solid #814937", color: "#555", width: "30px", height: "35px" }}
                    className="m-0 fs-4 rounded-circle border-2 align-items-center d-flex justify-content-center  ">{cantidad - contador}</p>
            </Card.Body>
        </Card>
    );
})

export default CardDeProductos