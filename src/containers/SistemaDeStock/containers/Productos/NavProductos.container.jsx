import SpinnerLoader from "@/components//SpinnerLoader"
import { NavProductoContenedor } from "@/styles/SistemaStock.module.css"
import { memo, useCallback, useEffect } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useSearchParams } from "react-router-dom"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor/wrapperNotificacionesServidor"
import axios from "axios"
import { DropDownSucursal } from "../../components/DropDownSucursal"

const NavItemImg = memo(({ img_url, id_categoria, rutaActual, onNavigate }) => {

    return (
        <NavLink
            onClick={() => onNavigate(id_categoria)}
            style={{ background: rutaActual && "#E84A7A", maxWidth: "min-content" }}
            className={`${rutaActual && "shadow"} justify-content-center transition overflow-hidden p-1 pt-1 rounded-4`}>
            <Nav.Item
                height={id_categoria == 5 ? 45 : 35}
                decoding="async"
                className="  mt-2 px-2 px-md-0  mt-lg-0"
                as={"img"}
                src={img_url} />
        </NavLink>

    )
})

const NavItems = wrapperNotificacionesServidor(memo(({ apiData, loader, generatePromise }) => {

    const [search, setSearch] = useSearchParams()

    const cancelToken = axios.CancelToken.source()

    const categoria = search.get("categoria")

    useEffect(() => {

        const promesa = { method: "GET", url: `stock/productos/categorias`, id: "productos/categorias", cancelToken: cancelToken.token }

        generatePromise({ promesa })

        return () => {
            cancelToken.cancel()
        }
    }, [])

    const { data = [] } = apiData["productos/categorias"] || {}

    const onNavigate = useCallback((categoriaActual) => {

        search.delete("categoria")

        if (categoria != categoriaActual) {
            search.append("categoria", categoriaActual)
        }
        setSearch(`?${search.toString()}`)

    }, [categoria])


    return (

        <Nav className="px-1 text-white fs-2  w-100 d-flex justify-content-between  align-items-center">
            {
                loader ?
                    <SpinnerLoader size="md" position="centered" />
                    :
                    data.map(item => <NavItemImg key={item.id_categoria} onNavigate={onNavigate} rutaActual={categoria == item.id_categoria} {...item} />)
            }
        </Nav>
    )
}))

const NavProductosContainer = () => {

    return (
        <Navbar
            expand="lg"
            className="d-flex justify-content-center align-items-center position-relative p-0 ">
            <Container
                id={NavProductoContenedor}
                fluid
                className="m-0 shadow  fondo-verde position-relative py-3">
                <div className="d-flex justify-content-between d-lg-none w-100 ">
                    <Navbar.Toggle
                        aria-controls="-navbar-nav"
                        className="bg-none z-1 border-0 bg-white" />
                        <DropDownSucursal />
                </div>
                <Navbar.Collapse
                    className="mt-1 w-100"
                    id="navbar-nav">
                    <NavItems />
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default NavProductosContainer