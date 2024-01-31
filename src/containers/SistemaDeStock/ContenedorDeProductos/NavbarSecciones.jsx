import { Container, Nav, Navbar, Spinner } from "react-bootstrap"
import styles from "@/styles/NavBarSecciones.module.css"
import { NavLink, useSearchParams } from "react-router-dom"
import { DropDownSucursal } from "@/components/DropDownSucursal"
import { memo, useEffect, useState } from "react"
import axios from "axios"


const NavItemImg = memo(({ img_url, id_categoria, rutaActual }) => {

    return (
        <NavLink
            style={{ background: rutaActual && "#E84A7A", maxWidth: "min-content" }}
            className={`${rutaActual && "shadow"} d-flex justify-content-center transition overflow-hidden p-1 pt-1 rounded-4`}
            to={`/stock/productos?categoria=${id_categoria}`}>
            <Nav.Item
                height={id_categoria == 5 ? 45 : 35}
                decoding="async"
                className="  mt-2 px-2 px-md-0  mt-lg-0"
                as={"img"}
                src={img_url} />
        </NavLink>

    )
})

const NavItems = () => {

    const [search] = useSearchParams()

    const [data, setData] = useState([])

    const quearyPath = search.get("categoria")

    const BACK_END_URL = import.meta.env.VITE_BACKEND_URL


    useEffect(() => {
        (async () => {
            const response = await axios.get(`${BACK_END_URL}/productos/categorias`)
            setData(response.data)
        })()


    }, [])

    return (

        <Nav className="px-1 text-white fs-2 d-flex justify-content-between w-100 align-items-center">
            {
                data.length == 0 ?
                    <Spinner variant="white" className="mx-auto p-3" />
                    :
                    data.map(item => <NavItemImg key={item.id_categoria} rutaActual={quearyPath == item.id_categoria} {...item} />)
            }
        </Nav>

    )
}

export const NavBarSecciones = () => {

    return (
        <Navbar
            expand="lg"
            className="d-flex justify-content-center align-items-center position-relative p-0 ">
            <Container id={styles.contenedorNav} fluid className="m-0 shadow  fondo-verde  py-3">
                <div className="d-flex justify-content-between d-lg-none w-100">
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="bg-none z-1 border-0 bg-white" />

                    <DropDownSucursal />
                </div>
                <Navbar.Collapse
                    className="mt-1"
                    id="basic-navbar-nav">
                    <NavItems />
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}