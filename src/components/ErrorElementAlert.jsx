import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertaRetryContext from "../provider/AlertaRetryProvider/AlertaRerty.provider";


//Este enfoque sirve para las alertas que se establecen mediante el loader de react-router.
//Se debe definir un ID, en el componente,que ese mismo ID se definira en la funcion removerAlerta en el componente que esta envuelto por el loader.

export const ErrorElementAlert = ({id}) => {

    const nav = useNavigate()

    const { establecerAlerta } = useContext(AlertaRetryContext)

    useEffect(() => {

        establecerAlerta({
            id:id,
            data: { code: 404 },
            generatePromise: () => {
                nav("/stock/gestion")
            }
        })
    }, [])

    return (
        <>

        </>
    );
}