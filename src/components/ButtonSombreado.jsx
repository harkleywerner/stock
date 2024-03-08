import { Button } from "react-bootstrap";

export const ButtonSombreado = ({
    children,
    border,
    background,
    className,
    onClick = () => { }
}) => {

    return (
        <Button
            onClick={onClick}
            style={{ background: `#${background}`, borderBottom: `4px solid #${border}` }}
            className={`py-2 remover-bordes rounded-3 ${className}`}>
            {children}
        </Button>
    );
};