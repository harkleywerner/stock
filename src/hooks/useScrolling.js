import { useEffect, useRef, useState } from "react";

export const useScrolling = (
    {
        obtenerDatos,
    } = {}

) => {

    const refScrolling = useRef()

    const [scrollVault, SetScrollVault] = useState([])

    useEffect(() => {

        const component = refScrolling.current

        const test = async (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;

            const scrollPercentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)

            if (scrollPercentage == 100) {
                await obtenerDatos()
            }
        }

        component.addEventListener("scroll", test)
        return () => component.removeEventListener("scroll", test)

    }, [])

    return {
        scrollVault,
        refScrolling,
    }

};