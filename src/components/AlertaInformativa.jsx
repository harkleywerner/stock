import { Alert } from "react-bootstrap";
import styles from "@/styles/AlertaInformativa.module.css"
import { memo } from "react";

const icon = {
  warning: "fa-solid fa-triangle-exclamation",
  info: "fa-solid fa-circle-info",
  danger: "fa-solid fa-circle-exclamation",
  success: "fa-solid fa-circle-check"
}

export const AlertaInformativa = memo(({ texto, tipo }) => {

  return (
    <Alert
      id={styles.AlertaInformativa}
      variant={tipo}
      style={{ maxWidth: "400px" }}
      className="d-flex align-items-center shadow  p-2"
    >
      <i className={`${icon[tipo]} fs-3 mx-2 `}></i>
      <Alert.Heading
        className="fs-4 text-break"
      >
        {texto}<span className="font">...</span>
      </Alert.Heading>
    </Alert>
  );
})