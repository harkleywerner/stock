import { useContext, } from "react";
import ContenedorDeTabla from "./ContenedorDeTabla/ContenedorDeTabla";
import { nuevoStockContext } from "@/provider//NuevoStockProvider";
import { useFiltrosParams } from "@/hooks//useFiltrosParams";

export const UltimaTabla = () => {

    const props = useContext(nuevoStockContext)["ultimaTabla"]

    const filtros = useFiltrosParams(props.state)

    return (
        <ContenedorDeTabla {...props} state={filtros} />
    );
};


