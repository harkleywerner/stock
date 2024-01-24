import { Container, Nav, Navbar } from "react-bootstrap"
import styles from "@/styles/NavBarSecciones.module.css"
import { NavLink, useSearchParams } from "react-router-dom"
import { DropDownSucursal } from "@/components/DropDownSucursal"
import { memo } from "react"

const navItems = [
    { id: "cremas", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/Cremas-Title.svg" },
    { id: "ddl", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/DDL-Title.svg" },
    { id: "agua", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/Alagua-Title.svg" },
    { id: "chocolate", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/Chocolate-Title.svg" },
    { id: "tortas", src: "https://i.ibb.co/HNH0My7/test.png", height: 42 }
]

const NavItemImg = memo(({ src, id, height = 35, rutaActual }) => {

    return (
        <NavLink
            style={{ background: rutaActual && "#E84A7A", maxWidth: "min-content" }}
            className={`${rutaActual && "shadow"} d-flex justify-content-center transition overflow-hidden p-1 pt-1 rounded-4`}
            to={`/stock?categoria=${id}`}>
            <Nav.Item
                height={height}
                decoding="async"
                className="  mt-2 px-2 px-md-0  mt-lg-0"
                as={"img"}
                src={src} />
        </NavLink>

    )
})

const NavItems = () => {

    const [search] = useSearchParams()

    const quearyPath = search.get("categoria")

    return (

        <Nav className="px-1 text-white fs-2 d-flex justify-content-between w-100 align-items-center">
            {
                navItems.map(item => <NavItemImg key={item.id} rutaActual={quearyPath == item.id} {...item} />)
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