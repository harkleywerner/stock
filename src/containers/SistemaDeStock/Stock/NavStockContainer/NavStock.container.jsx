import { informacionInicialContext } from "@/provider//informacionInicialProvider/informacionInicial.provider"
import { useContext } from "react"
import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { DropDownSucursal } from "../../components/DropDownSucursal"
import { BuscadorResponsive } from "./BuscadorResponsive"
import { UsuariosItem } from "./UsuariosItem"
import { ConnectionItem } from "./connectionItem"
import styles from "./styles/NavStock.module.css"


const NavStockContainer = () => {

  const { sucursal_info } = useContext(informacionInicialContext)

  const { loggeado } = sucursal_info

  return (
    <header
      style={{ minHeight: "70px" }}
      className='d-flex justify-content-between shadow w-100  fondo-verde align-items-center'>
      <Navbar className="w-100">

        <Container className="w-100" fluid>

          <Navbar.Brand className="mt-1 d-none d-sm-block">
            <img
              height={60}
              decoding="async"
              src='https://www.pauletti.com.ar/wp-content/uploads/2022/08/Logo-SVG.svg' />
          </Navbar.Brand>

          <Nav className="d-flex justify-content-between w-100 scrollbar ">

            <Stack
              direction="horizontal"
              className="flex-fill justify-content-center  "
              gap={3}>
              <NavLink
                className={styles.itemsDecorate}
                to={"/stock"}>
                <i className="fa-solid fa-warehouse text-white fs-4 m-0 cursor-pointer  transition"></i>
              </NavLink>
              <NavLink
                className={styles.itemsDecorate}
                to="/stock/productos">
                <i className={`fa-solid fa-ice-cream text-white fs-4 m-0 cursor-pointer  transition `}></i>
              </NavLink>
              {
                loggeado &&
                <NavLink
                  className={styles.itemsDecorate}
                  to={"/stock/nuevo"}>
                  <i className="fa-solid  cursor-pointer transition text-white fs-4 fa-boxes-packing"></i>
                </NavLink>
              }
              <NavLink
                className={styles.itemsDecorate}
                to={"/stock/gestion"}>
                <i className="fa-solid fa-boxes-stacked text-white fs-4 m-0 cursor-pointer  transition"></i>
              </NavLink>
              
              <ConnectionItem />

              <Nav.Item
                className="d-none d-lg-inline">
                <DropDownSucursal />
              </Nav.Item>
              {
                loggeado && <UsuariosItem />
              }
            </Stack>

            <BuscadorResponsive />
          </Nav>

        </Container>

      </Navbar>




    </header>
  )

}

export default NavStockContainer