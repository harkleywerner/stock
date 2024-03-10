import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { addProducto, editProducto } from "@/store//reducer/nuevoStock/nuevoStock.slice";
import { lazy } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const InterfazDeGestionDeProductos = lazy(() => import("../../components/InterfazDeGestionDeProductos/InterfazDeGestionDeProductos"))

const AgregarItem = () => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const { stock, inicializado } = useSelector(state => state.nuevo_stock)

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
                 p-1 justify-content-center d-flex resaltador align-items-center
                `}>
                <p className="m-0 fw-normal fs-5 mx-1">Agregar item</p>
                <i className="fa-regular fs-4 fa-square-plus"></i>
            </Nav.Item>

            <SuspenseLoadingComponent>
                {
                    mostrar &&
                    <InterfazDeGestionDeProductos
                        alternarMostrar={alternarMostrar}
                        mostrar={mostrar}
                        inicializado={inicializado}
                        addProducto={addProducto}
                        editProducto={editProducto}
                        stock={stock}
                    />
                }
            </SuspenseLoadingComponent>
        </>
    )
};


export default AgregarItem