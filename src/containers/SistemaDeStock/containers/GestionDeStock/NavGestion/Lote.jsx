import { Badge, NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Lote = () => {
    const { stock_info } = useSelector(state => state.gestion_stock)

    return (
        <NavItem
            className="text-decoration-none text-white  fs-3 p-1 justify-content-center  d-flex align-items-center">
            <Badge
                style={{ backgroundColor: "#814937" }}
                bg="none"
                className="shadow">
                Lote #{stock_info.lote}
            </Badge>
        </NavItem>

    )
};