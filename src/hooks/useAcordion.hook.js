import { useCallback, useState } from "react";

export const useAcordion = ({ multiples = 0 } = {}) => {

    const [accordion, setAccordion] = useState([])

    const establecerAccordion = useCallback((id) => {
        setAccordion(prev => {
            if (prev.length <= multiples) {
                return [...prev, id]
            }
            else if (prev.includes(id)) {
                return prev.filter(item => item != id)
            }
            return [id]
        })
    }, [])

    return {
        establecerAccordion,
        accordion
    }
};