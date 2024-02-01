import { Suspense, memo, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import styles from "@/styles/SuspenseLoadingComponent.module.css"
import { useAlternarComponentes } from "@/hooks/useAlternarComponentes";


export const SuspenseLoadingComponent = memo(({ children }) => {

    const { alternarMostrar, mostrar } = useAlternarComponentes();

    useEffect(() => {
        alternarMostrar(false)
    }, [children])

    return (
        <Suspense
            fallback={
                <div
                    id={styles.contenedorSuspense}
                    style={{ maxWidth: "170px",minWidth : "170px" }}
                    className={`${mostrar ? "d-none" : "d-inline"} p-0 position-fixed justify-content-center rounded-2 z-1  p-2 shadow  d-flex flex-column align-items-center`}
                >
                    <i
                        id={styles.closeSupense}
                        onClick={alternarMostrar}
                        className="fa-solid position-absolute fa-xmark p-2 transition cursor-pointer text-white fs-4"
                    ></i>
                    <Spinner
                        animation="border"
                        style={{ height: "30px", width: "30px" }}
                        variant="white"
                    />
                    <p className="m-0 fw-medium fs-5 text-white">
                       Cargando...
                    </p>
                </div>
            }
        >
            {children}
        </Suspense>
    );
});
