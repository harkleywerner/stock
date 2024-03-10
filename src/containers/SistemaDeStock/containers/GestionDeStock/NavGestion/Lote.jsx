import { ButtonSombreado } from "@/components//ButtonSombreado";
import { resetGestionDeStock } from "@/store//reducer/gestionDeStock/gestionDeStock.slice";
import { NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export const Lote = () => {

    const { stock_info } = useSelector(state => state.gestion_stock)

    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(resetGestionDeStock())
    }


    return (
        <NavItem
            className="text-decoration-none text-white  fs-3 p-1 justify-content-center  d-flex align-items-center">
            <ButtonSombreado
                onClick={onClick}
                background={"CC966B"}
                border={"b36843"}
            >
                <small className="fs-5">  Lote #{stock_info.lote}</small>
            </ButtonSombreado>
        </NavItem>

    )
};