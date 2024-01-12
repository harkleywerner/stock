import { Stack } from "react-bootstrap"
import { BuscadorResponsive } from "../components/BuscadorResponsive"


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
        gap={4}
   
        className=" justify-content-center  align-items-center">
        <p className="fw-medium text-white fs-2 m-0 cursor-pointer  hover-rosa transition">Usuario</p>
        <p className="fw-medium text-white fs-2 m-0 cursor-pointer  hover-rosa transition">Sucursal</p>
        <i className="fa-solid hover-rosa cursor-pointer transition text-white fs-3 fa-boxes-packing"></i>
      </Stack>
      <BuscadorResponsive texto={""}/>
    </header>
  )

}