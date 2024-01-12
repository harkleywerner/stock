import { Suspense, memo } from "react";
import { Spinner } from "react-bootstrap";


export const SuspenseLoadingComponent = memo(({ children, texto = "" }) => {

    return (
        <Suspense
            fallback={
                <div className="p-0 justify-content-center z-1  d-flex flex-column align-items-center">
                    <Spinner
                        animation="border"
                        style={{ height: "30px", width: "30px" }}
                        variant="white"
                    />
                    <p className="m-0 fw-medium text-primary-2 ls-3">{texto}</p>
                </div>
            }
        >
            {children}
        </Suspense>
    );
});