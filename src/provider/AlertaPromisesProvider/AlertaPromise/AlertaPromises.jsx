import { useEffect, useState } from "react";
import { AlertaPromiseModal } from "./AlertaPromiseModal";
import { MiniAlerta } from "./miniAlerta";

const AlertaPromises = (
  {
    removerAlerta,
    data = {},
    id,
    intentos_iniciales = 0,
    generatePromise,
    alternarMostrar,
    mostrar
  }) => {

  const [intentos, setIntentos] = useState(intentos_iniciales)

  useEffect(() => {

    const timeOUT = setTimeout(async () => {

      if (!intentos) return

      const datos = await generatePromise({ intentos })

      if (datos?.status == "success") {
        alternarMostrar(false)
        removerAlerta(id)
      }
      else {
        setIntentos(prev => {
          const intento = prev - 1
          return intento <= 0 ? 0 : intento
        })
      }
    }, 3000);

    return () => clearTimeout(timeOUT)

  }, [intentos, id])

  return (
    <>
      {
        !mostrar ?
          <AlertaPromiseModal
            alternarMostrar={alternarMostrar}
            mostrar={mostrar}
            data={data}
            intentos={intentos}
          />
          :
          <MiniAlerta
            data={data}
            alternarMostrar={alternarMostrar}
            intentos={intentos}
          />
      }

    </>
  );
}

export default AlertaPromises