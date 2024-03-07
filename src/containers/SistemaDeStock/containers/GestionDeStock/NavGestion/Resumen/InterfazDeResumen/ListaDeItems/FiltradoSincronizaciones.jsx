
import { memo } from "react";
import { Stack } from "react-bootstrap";


const circles = [
    { background: "92e3a6", color: "5ace77", id: "success" },
    { background: "ff9998", color: "ff5e5d", id: "denied" },
    { background: "7cdafd", color: "36c9fa", id: "expecting" }
]

const FiltradoSincronizaciones = memo(({
    sincronizacion,
    onHandleSincronizacion
}) => {

    return (
        <Stack
            direction="horizontal" gap={2}>
            {
                circles.map(i =>
                    <span
                        onClick={() => onHandleSincronizacion(i.id)}
                        key={i.id}
                        style={
                            {
                                width: "22px",
                                height: "22px",
                                backgroundColor: `#${sincronizacion == i.id ? i.color : i.background}`,
                                border: `2px solid #${i.color}`
                            }}
                        className="rounded-circle cursor-pointer transition"
                    />
                )
            }
        </Stack>
    );
})

export default FiltradoSincronizaciones