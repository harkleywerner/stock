import { SuspenseLoadingComponent } from "@/components//SuspenseLoadingComponent";
import { useAlternarComponentes } from "@/hooks//useAlternarComponentes";
import { Nav } from "react-bootstrap";
import { lazy } from "react";

const InterfazDeResumen = lazy(()=> import("./InterfazDeResumen/InterfazDeResumen"))

export const ResumenDeGuardado = () => {

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    return (
        <>
            <Nav.Item
                onClick={alternarMostrar}
                className="d-flex gap-2 align-items-center resaltador transition hover-rosa cursor-pointer">
                <i className="fa-regular fa-file-lines"></i>
                <p className="m-0 fs-5">Resumen</p>
            </Nav.Item>
            <SuspenseLoadingComponent>
                {
                    mostrar &&
                    <InterfazDeResumen
                        mostrar={mostrar}
                        alternarMostrar={alternarMostrar} />
                }
            </SuspenseLoadingComponent>
        </>
    );
};