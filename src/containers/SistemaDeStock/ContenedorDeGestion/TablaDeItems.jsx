import { Table } from "react-bootstrap";

export const TablaDeItems = () => {
    return (
        <Table striped bordered className = "w-50 shadow" >
            <thead className="shadow position-relative">
                <tr >
                    <th className="font" >#</th>
                    <th className="fw-normal fs-5">Nombre</th>
                    <th className="fw-normal fs-5">Categoria</th>
                    <th className="fw-normal fs-5">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Dulce de leche pauletti</td>
                    <td>Dulce de leche</td>
                    <td>55</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Dulce de leche pauletti</td>
                    <td>Dulce de leche</td>
                    <td>55</td>
                </tr>
            </tbody>
        </Table>
    );
};