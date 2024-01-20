import { Button, Stack } from "react-bootstrap"

const Paginacion = ({ establecerPaginacion, page,largo }) => {

    const onClick = (n) => {
       if(largo < 15 && n == 1) return
       establecerPaginacion(n)
    }

    return (
        <Stack
            gap={3}
            direction="horizontal"
            className="p-2 justify-content-center">
            <Button
                style={{ color: "#4EAAB2" }}
                variant="none"
                onClick={() => onClick(-1)}
                className="fs-4 bg-white d-flex  align-items-center zoom">
                <i className="fa-solid fa-circle-left fs-2 "></i>
            </Button>
            <p className="m-0 font fs-4 text-white">{page}/15</p>
            <Button
                variant="none"
                style={{ color: "#4EAAB2" }}
                onClick={() => onClick(+1)}
                className="fs-4 d-flex bg-white align-items-center zoom">
                <i className="fa-solid fa-circle-right fs-2 "></i>
            </Button>
        </Stack>
    )
}

export default Paginacion