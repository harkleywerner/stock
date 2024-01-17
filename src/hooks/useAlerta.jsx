import { useCallback, useState } from "react";
import { AlertaInformativa } from "../components/AlertaInformativa";

export const useAlerta = () => {

    const [alerta, setAlerta] = useState([])

    const establercerAlerta = useCallback((nuevaAlerta) => {

        return new Promise((res) => {
            setAlerta(prev => {
                const findIndex = prev.findIndex(item => item.id == nuevaAlerta.id)
                const splicePrev = [...prev].filter(item => item.id !== nuevaAlerta.id)
                res(findIndex)
                return [...splicePrev, { ...nuevaAlerta }]
            })
        })
            .then((indice) => {
                if (indice == -1) {
                    setTimeout(() => {
                        setAlerta(prev => prev.slice(1))
                    }, 5000);
                }
            })
    }, [])

    const ListaDeAlerta = (
        <div
            className="position-fixed  "
            style={{ zIndex: "10", maxHeight: "100vh", right: "1%", top: "1%" }} >
            {
                alerta.length > 0 && alerta.map((item, index) => <AlertaInformativa key={index} {...item} />)
            }
        </div>
    )
    return {
        ListaDeAlerta,
        establercerAlerta
    }
};
