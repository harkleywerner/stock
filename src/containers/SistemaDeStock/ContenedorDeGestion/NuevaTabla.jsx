import { useContext } from "react";
import ContenedorDeTabla from "./ContenedorDeTabla/ContenedorDeTabla";
import { nuevoStockContext } from "@/provider//NuevoStockProvider";
import { useFiltrosParams } from "@/hooks//useFiltrosParams";


const NuevaTabla = () => {

    const props = useContext(nuevoStockContext)["nuevaTabla"]

    const filtros = useFiltrosParams(props.state)

    return (
        <ContenedorDeTabla {...props} state={filtros} />
    );
};


export default NuevaTabla

