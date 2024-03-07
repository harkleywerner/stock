import { memo } from "react"

const OrdenItems = memo(({
    onChangeOrder,
    order
}) => {
    return (
        <div className="flex-column d-flex" >
            <i
                onClick={() => onChangeOrder(true)}
                style={{ color: order ? "#b36843" : "#e9d6bf" }}
                className="fs-4 fa-solid  fa-caret-up cursor-pointer"></i>
            <i
                onClick={() => onChangeOrder(false)}
                style={{ color: !order ? "#b36843" : "#e9d6bf" }}
                className="fs-4 fa-solid  fa-caret-down cursor-pointer"></i>
        </div>
    )
})
export default OrdenItems