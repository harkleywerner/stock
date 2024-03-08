
import styles from "@/styles/AlertaRetry.module.css";

export const MiniAlerta = ({
    alternarMostrar,
    data,
    intentos
}) => {

    const { code } = data

    return (
        <div
            onClick={alternarMostrar}
            style={{ zIndex: "3000", background: "#DE4E75", borderBottom: "4px solid #b12540", minWidth: "200px" }}
            className={`position-absolute d-flex cursor-pointer align-items-center p-2 j  transition text-white rounded-2 m-1 bottom-0  ${intentos > 0 && styles.AlertAnimacion}`}>
            <h6 className="m-0">#{code}</h6>
            <small className="m-0 mx-3">
                {intentos > 0 ? `${intentos}  reintentando...` : "FAILED"}
            </small>
        </div>
    );
};