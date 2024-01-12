import { Col } from "react-bootstrap";
import { lazy } from "react";
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";
import { SuspenseLoadingComponent } from "@/components/SuspenseLoadingComponent";
import { CardDeProductos } from "@/components/CardDeProductos";

const FormularioDeRetiroDeProducto = lazy(() => import("@/components/FormularioDeRetiroDeProducto"))


const ContenedorDeCard = () => {
    const { alternarMostrar, mostrar } = useAlternarComponentes()
    return (
        <>
            <CardDeProductos alternarMostrar={alternarMostrar} />

            <SuspenseLoadingComponent>
                {mostrar && <FormularioDeRetiroDeProducto
                    alternarMostrar={alternarMostrar}
                    mostrar={mostrar} />}
            </SuspenseLoadingComponent>

        </>
    )
}

export const ContenedorDeAlmacen = () => {


    return (
        <Col
            className=" m-0 p-0 d-flex scrollbar align-content-start  h-100 flex-wrap  justify-content-center ">
            {
                Array.from({ length: 60 }).map((item, index) =>
                    <ContenedorDeCard key={index} indice={index} />
                )
            }

        </Col>
    );
};