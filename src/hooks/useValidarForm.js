import { useCallback, useState } from "react";

export const useValidarForm = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
    };

    const onValidated = useCallback((tipo) => {
        setValidated(tipo)
    }, [])

    return {
        handleSubmit,
        validated,
        onValidated
    }
};