import SpinnerLoader from "@/components/SpinnerLoader"
import { forwardRef, useEffect, useRef, useState } from "react"

const scrollObserver = ({ ApiCall, validationLength, setLoading }) => {
    const config = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    }

    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {

            const hasVisited = entry.target.hasVisited

            if (entry.intersectionRatio >= 0.5 && !hasVisited && validationLength == 0) {
                ApiCall();
                entry.target.hasVisited = true;
                setLoading(true)
            }
        })
    }, config)
}


const ScrollingInfinite = forwardRef(({
    children,
    ApiCall,
    dataLength,
    loaderComponent,
    step = 1 //Define la cantidad que hace cada llamada de apiCall
} = {},
    ref
) => {

    const [isLoading, setLoading] = useState(false)


    const countApiCall = useRef({})
    //=> Sirve para detectar cuando se llama apiCall pero retorna el mismo largo.

    useEffect(() => {

        if(!isLoading) return
        
        countApiCall.current[dataLength] = (countApiCall.current[dataLength] || 0) + 1
            if (countApiCall.current[dataLength] >= 3) {
                setLoading(false)
            }
    })

    useEffect(() => {

        dataLength > 0 && setLoading(false)

        const items = ref.current

        const observer = scrollObserver({ ApiCall, validationLength: dataLength % step, setLoading })

        if (items && dataLength !== 0) {
            
            const largo = items.children.length - 4
            const child = items.children[largo < 0 ? 0 : largo]

            if (!child) return

            observer.observe(child)
        }


        return () => {
            observer.disconnect()
        }

    }, [dataLength])

    return (
        <div className="d-flex flex-column position-relative h-100 w-100 ">
            {children}
            {
                isLoading && dataLength > 0 &&
                (loaderComponent ? loaderComponent : <SpinnerLoader position="centered" />)

            }
        </div>
    )

})

export default ScrollingInfinite
