import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { BuscadorResponsive } from "@/components/BuscadorResponsive"
import { DropwDownUsuario } from "./DropwDownUsuario"
import { DropDownSucursal } from "@/components/DropDownSucursal"
import { Link, NavLink } from "react-router-dom"

export const NavHeader = () => {

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
          <Nav className="d-flex justify-content-between w-100 ">

            <Stack direction="horizontal" className="flex-fill   justify-content-center" gap={3}>
              <NavLink to={"/stock"}>
                <i className="fa-solid fa-warehouse text-white fs-2 m-0 cursor-pointer hover-rosa transition"></i>
              </NavLink>
              <NavLink to={"/stock/gestion"}>
                <i className="fa-solid hover-rosa cursor-pointer transition text-white fs-2 fa-boxes-packing"></i>
              </NavLink>
              <i className="fa-solid fa-wifi text-white fs-2 m-0 cursor-pointer   hover-rosa transition"></i>
              <span className="d-none d-lg-inline">
                <DropDownSucursal />
              </span>
              <DropwDownUsuario />
            </Stack>

            <BuscadorResponsive texto={""} />
          </Nav>

        </Container>

      </Navbar>




    </header>
  )

}