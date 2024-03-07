import { Badge } from "react-bootstrap";

export const ButtonSombreado = ({
    children,
    border,
    background,
    className,
    element = "span",
    onClick = () => { }
}) => {
    return (
        <Badge
            as={element}
            bg="none"
            onClick={onClick}
            style={{ background: `#${background}`, borderBottom: `3px solid #${border}` }}
            className={`py-2 remover-bordes rounded-3 ${className}`}>
            {children}
        </Badge>
    );
};