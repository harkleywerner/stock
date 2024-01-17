import { useContext, } from "react";
import TablaDeItems from "./TablaDeItems";
import { nuevoStockContext } from "@/provider//NuevoStockProvider";



export const UltimaTabla = () => {

    const props = useContext(nuevoStockContext)["ultimaTabla"]

    const stateFiltrado = [...props.state]

    return (
        stateFiltrado.length == 0 ? <p className="text-white fw-normal fs-1 h-100 d-flex align-items-center">No se encontraron tablas<span className="font">...</span></p> :
            <TablaDeItems {...props} state={stateFiltrado} />
    );
};


