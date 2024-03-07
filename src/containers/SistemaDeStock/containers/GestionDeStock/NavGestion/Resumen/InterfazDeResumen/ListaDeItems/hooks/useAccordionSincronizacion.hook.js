import { useCallback, useState } from "react";

export const useAccordionSincronizacion = () => {
    const [accordionId, setAccordionId] = useState()

    const onHandleAccordion = useCallback((id_producto) => {
        setAccordionId(prev => prev == id_producto ? "" : id_producto)
    }, [])

    return {
        accordionId,
        onHandleAccordion
    }
};
