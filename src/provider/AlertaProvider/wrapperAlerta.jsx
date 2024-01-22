import { useContext, useMemo } from "react";
import { AlertasContext } from "./AlertasProvider";

const wrapperAlerta = (Component) => {

    return (props) => {
        const { establercerAlerta } = useContext(AlertasContext);

    return (
        <Component establercerAlerta={establercerAlerta} {...props} />
    )
};
}

export default wrapperAlerta