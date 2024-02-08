import { Container, Nav, Navbar, Spinner } from "react-bootstrap"
import styles from "@/styles/NavBarSecciones.module.css"
import { NavLink, useSearchParams } from "react-router-dom"
import { DropDownSucursal } from "@/components/DropDownSucursal"
import { memo } from "react"

import wrapperNotificaciones from "@/provider//NotificacionesProvider/wrapperNotificaciones"
import { usePromiseHandler } from "@/hooks//usePromiseHandler"
import SpinnerLoader from "@/components//SpinnerLoader"


const NavItemImg = memo(({ img_url, id_categoria, rutaActual }) => {

    return (
        <NavLink
            style={{ background: rutaActual && "#E84A7A", maxWidth: "min-content" }}
            className={`${rutaActual && "shadow"} justify-content-center transition overflow-hidden p-1 pt-1 rounded-4`}
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

const NavItems = wrapperNotificaciones(memo(({ establecerAlerta }) => {

    const [search] = useSearchParams()

    const quearyPath = search.get("categoria")

    const listaDePromesas = [{ method: "GET", url: `/productos/categorias`, id: "productos/categorias" }]

    const { data, loader } = usePromiseHandler({ listaDePromesas, establecerAlerta })

    const categorias = data["productos/categorias"] || []


    return (

        <Nav className="px-1 text-white fs-2  w-100 d-flex justify-content-between  align-items-center">
            {
                !loader ?
                    <SpinnerLoader size="md" />
                    :
                    categorias.map(item => <NavItemImg key={item.id_categoria} rutaActual={quearyPath == item.id_categoria} {...item} />)
            }

        </Nav>
    )
}))

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
                    className="mt-1 w-100"
                    id="basic-navbar-nav">
                    <NavItems />
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}