import { Stack } from "react-bootstrap"
import { BuscadorResponsive } from "@/components/BuscadorResponsive"
import { DropwDownUsuario } from "./DropwDownUsuario"
import { DropDownSucursal } from "@/components/DropDownSucursal"
import { Link } from "react-router-dom"


export const NavHeader = () => {

  return (
    <header
      style={{ minHeight: "70px" }}
      className='d-flex justify-content-between shadow w-100 position-relative fondo-verde align-items-center'>

      <img
        className='mt-1 d-none d-sm-block'
        height={60}
        decoding="async"
        src='https://www.pauletti.com.ar/wp-content/uploads/2022/08/Logo-SVG.svg' />

      <Stack
        direction="horizontal"
        gap={3}
        className=" justify-content-center align-items-center">
        <Link to={"/stock"}>
          <i className="fa-solid fa-warehouse text-white fs-2 m-0 cursor-pointer hover-rosa transition"></i>
        </Link>
        <Link to={"/gestionarstock"}>
          <i className="fa-solid hover-rosa cursor-pointer transition text-white fs-2 fa-boxes-packing"></i>
        </Link>
        <i className="fa-solid fa-wifi text-white fs-2 m-0 cursor-pointer   hover-rosa transition"></i>
        <span className="d-none d-lg-inline">
          <DropDownSucursal />
        </span>
        <DropwDownUsuario />
      </Stack>

      <BuscadorResponsive texto={""} />

    </header>
  )

}