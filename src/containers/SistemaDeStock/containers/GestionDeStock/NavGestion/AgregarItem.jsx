import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { addProducto, editProducto } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { lazy } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const InterfazDeGestionDeProductos = lazy(() => import("../../components/InterfazDeGestionDeProductos/InterfazDeGestionDeProductos"))

export const AgregarItem = () => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { stock, inicializado } = useSelector(state => state.gestion_stock)

    const verificarStock = () => {
        if (!inicializado) return
        alternarMostrar()
    }

    return (
        <>
            <Nav.Item
                onClick={verificarStock}
                className={`
                ${inicializado ? "hover-rosa transition cursor-pointer" : "opacity-50 cursor-block"}
                 p-1 justify-content-center d-flex align-items-center
                `}>
                <p className="m-0 fw-normal fs-5 mx-1">Agregar item</p>
                <i className="fa-regular fs-4 fa-square-plus"></i>
            </Nav.Item>

            <SuspenseLoadingComponent >
                {
                    mostrar &&
                    <InterfazDeGestionDeProductos
                        alternarMostrar={alternarMostrar}
                        mostrar={mostrar}
                        addProducto={addProducto}
                        editProducto={editProducto}
                        stock={stock}
                    />
                }
            </SuspenseLoadingComponent>
        </>
    )
};