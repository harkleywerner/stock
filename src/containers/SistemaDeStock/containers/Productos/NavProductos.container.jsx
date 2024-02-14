import SpinnerLoader from "@/components//SpinnerLoader"
import { DropDownSucursal } from "@/components/DropDownSucursal"
import { NavProductoContenedor } from "@/styles/SistemaStock.module.css"
import { memo, useCallback, useEffect } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useSearchParams } from "react-router-dom"
import { wrapperNotificacionesServidor } from "@/components//wrapperNotificacionesServidor"

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

const NavItems = wrapperNotificacionesServidor(memo(({ data, loader, generatePromise }) => {

    const [search, setSearch] = useSearchParams()

    const categoria = search.get("categoria")

    const listaDePromesas = [{ method: "GET", url: `/productos/categorias`, id: "productos/categorias" }]

    useEffect(() => {
        generatePromise({ promesas: listaDePromesas })
    }, [])

    const categorias = data["productos/categorias"] || []

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
                    <SpinnerLoader size="md" position = "centered" />
                    :
                    categorias.map(item => <NavItemImg key={item.id_categoria} onNavigate={onNavigate} rutaActual={categoria == item.id_categoria} {...item} />)
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
                className="m-0 shadow  fondo-verde  py-3">
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

export default NavProductosContainer