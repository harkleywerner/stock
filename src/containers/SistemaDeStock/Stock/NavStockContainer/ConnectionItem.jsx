import { useContext } from "react";
import { Nav } from "react-bootstrap";
import styles from "./styles/NavStock.module.css";
import AlertaPromisesContext from "@/provider//AlertaPromisesProvider/AlertaPromises.provider";

export const ConnectionItem = () => {

    const { alertas } = useContext(AlertaPromisesContext)


    return (
        <Nav.Item
            className={`${styles.itemsDecorate} ${alertas.length > 0 && styles.parpadeo} position-relative d-flex`} >
            <span
                style={{ height: "20px", width: "20px", fontSize: "13px", backgroundColor: "#DE4E75" }}
                className="rounded-circle translate-middle start-100 d-flex align-items-center justify-content-center position-absolute  text-white">
                {alertas.length}
            </span>
            <i className="fa-solid fa-wifi text-white fs-4 m-0 cursor-pointer transition"></i>
        </Nav.Item>
    );
};