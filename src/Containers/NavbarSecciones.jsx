import { Container, Nav, Navbar } from "react-bootstrap"
import styles from "../Styles/NavBarSecciones.module.css"
import { NavLink } from "react-router-dom"

const navItems = [
    { id: "cremas", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/Cremas-Title.svg" },
    { id: "ddl", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/DDL-Title.svg" },
    { id: "agua", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/Alagua-Title.svg" },
    { id: "chocolate", src: "https://www.pauletti.com.ar/wp-content/uploads/2022/08/Chocolate-Title.svg" },
    { id: "tortas", src: "https://i.ibb.co/HNH0My7/test.png", height: 42 }
]

const NavItemImg = ({ src, id, height = 35 }) => {
    return (
        <NavLink className="d-flex justify-content-center" to={`?s=${id}`}>
            <Nav.Item
                id={styles[id]}
                height={height}
                decoding="async"
                className="transition mt-2 mt-lg-0"
                as={"img"}
                src={src} />
        </NavLink>

    )
}

export const NavBarSecciones = () => {

    return (
        <Navbar
            expand="lg"
            className="d-flex justify-content-center p-0 ">
            <Container id={styles.contenedorNav} fluid className="m-0 shadow  fondo-verde  py-3">
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="bg-none border-0 bg-white" />
                <Navbar.Collapse
                    id="basic-navbar-nav">
                    <Nav className="px-1 text-white fs-2 d-flex justify-content-between w-100">

                        {
                            navItems.map(item => <NavItemImg key={item.id} {...item} />)
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}