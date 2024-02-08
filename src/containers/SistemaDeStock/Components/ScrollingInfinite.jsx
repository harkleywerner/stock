import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import SpinnerLoader from "@/components/SpinnerLoader"

const scrollObserver = ({ ApiCall, validationLength }) => {
    const config = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    }

    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {

            if (entry.intersectionRatio >= 0.5 && !entry.target.hasVisited && validationLength == 0) {
                ApiCall();
                entry.target.hasVisited = true;
            }
        })
    }, config)
}


const ScrollingInfinite = ({
    children,
    ApiCall,
    dataLength,
    loader,
    elementToObserve,
    step = 1 //Define la cantidad que hace por llamada en la function A
} = {}) => {

    const { loaderStatus, color, size } = loader

    useEffect(() => {

        const items = elementToObserve.current

        const observer = scrollObserver({ ApiCall, validationLength: dataLength % step })


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
        <Container

            className=" p-0 d-flex h-100 position-relative fluid flex-column">
            {
                !loaderStatus && dataLength == 0 &&
                <Row
                    className="m-0 h-100 justify-content-center align-items-center overflow-hidden">
                    <SpinnerLoader
                        size={size}
                        color={color} />
                </Row>

            }


            <Row className={` justify-content-center m-0  align-items-center scrollbar`}>

                <Col className="d-flex flex-column p-0 align-items-center align-content-start  justify-content-center">
                    {/*El contenedor children tiene que esta envuelto por un contenedor, el cual contenga el mapeo de los items, ademas en no debe tener el 100% del heigth, puede generar errores visuales*/}
                    {children}
                    <span className=" p-1 overflow-hidden">
                        {
                            !loaderStatus && dataLength > 0 && <SpinnerLoader
                                size={size}
                                color={color} />
                        }

                    </span>
                </Col>
            </Row>



        </Container>
    )

}

export default ScrollingInfinite
