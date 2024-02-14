import styles from "@/styles/AlertaRetry.module.css";
import { memo, useEffect, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";


const RestoDelMensaje = memo(({ message }) => {

  const [show, setShow] = useState(false)

  return (
    <div className="d-flex flex-column align-items-center w-100 justify-content-center">
      <span
        style={{ width: "min-content", fontSize: "16px" }}
        onClick={() => setShow(!show)}
        className="cursor-pointer text-dark text-nowrap transition text-center py-2 mt-1 mb-2"
      >
        {
          show ? "Ocultar[-]" : "Mostrar[+]"
        }
      </span>
      {show && (
        <p
          id={styles.textoAnimado}
          className="m-0 border w-100 text-center border-3 text-muted text-break d-flex align-items-center justify-content-center"
        >
          {message}
        </p>
      )}
    </div>
  )
})

const AlertaRetry = (
  {
    removerAlerta,
    data,
    id,
    intentos,
    establecerIntentos,
    generatePromise
  }) => {

  const { code, message } = data || {}

  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(true)
    const timeOUT = setTimeout(async () => {
      const datos = await generatePromise({ intentos })

      if (intentos <= 0) return

      if (datos?.status == "success") {

        setShow(false)
        removerAlerta(id)
      }
      else {
        establecerIntentos(id)
      }
    }, 3000);

    return () => clearTimeout(timeOUT)

  }, [intentos])

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <Modal
      backdrop={false}
      show={show}
      onHide={() => setShow(!show)}
      animation={true}>
      <Modal.Header
        style={{ right: "0%" }}
        className="border-0 fs-5 w-100 position-absolute z-1"
        closeButton={intentos > 0}>
        <Badge bg="none" style={{ background: "#E84A7A" }} >#{code}</Badge>
      </Modal.Header>
      <Modal.Body
        className={`shadow d-flex flex-column justify-content-center align-items-center `}>
        <div style={{ border: "1px solid #E84A7A" }} className=" p-3  rounded-circle px-4 border-5">
          <i style={{ color: "#E84A7A" }} className="fa-solid fa-x fs-1"></i>
        </div>
        <h2 className="text-center text-secondary py-2">Oops...</h2>
        <small style={{ fontSize: "16px" }} className="text-center text-secondary ">Algo salio mal. Por favor, aguarda mientras intentamos nuevamente.</small>
        <RestoDelMensaje message={message} />
        {
          intentos > 0 ?
            <p style={{ color: "#E84A74" }}
              className={`${styles.AlertAnimacion}   m-0 p-1 `}>Reintentando... {intentos}</p> :

            <Button
              variant="dark"
              onClick={reloadPage}
              className={`border-0 w-50 mt-1 transition text-uppercase`}
              style={{ background: "#E84A7A" }}>
              Refrescar pagina
            </Button>
        }
      </Modal.Body>
    </Modal>

  );
}

export default AlertaRetry