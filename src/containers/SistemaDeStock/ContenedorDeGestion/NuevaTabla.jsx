import { useContext } from "react";
import TablaDeItems from "./TablaDeItems";
import { nuevoStockContext } from "@/provider//NuevoStockProvider";
import { useSearchParams } from "react-router-dom";


const NuevaTabla = () => {

    const props = useContext(nuevoStockContext)["nuevaTabla"]

    const { state } = props

    const [search] = useSearchParams()

    const busqueda = search.get("search")

    const filtradoPorCategoria = search.get("categoria")

    const stateFiltrado = [...state].filter(item => {

        const verificarCategoria = !filtradoPorCategoria ? item.categoria : filtradoPorCategoria

        if (!busqueda) return item.nombre && item.categoria == verificarCategoria

        const comparacion = item.nombre.toLowerCase().startsWith(busqueda.toLowerCase()) && item.categoria == verificarCategoria

        return comparacion
    })


    return (
        stateFiltrado.length == 0 ? <p className="text-white fw-normal fs-1 h-100 d-flex align-items-center">No se encontraron items<span className="font">...</span></p> :
            <TablaDeItems {...props} state={stateFiltrado} />

    );
};


export default NuevaTabla

