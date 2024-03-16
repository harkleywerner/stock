import { ButtonSombreado } from "@/components//ButtonSombreado";
import { useEstablecerParametros } from "@/hooks//useEstablecerParametros";
import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { BuscadorDeProductos } from "./BuscadorDeProductos/BuscadorDeProductos";
import { CantidadInput } from "./CantidadInput";
import verificacionStock from "./helpers/verificiarStock.helper";

const InterfazDeGestionDeProductos = (
    {
        alternarMostrar,
        mostrar,
        producto_seleccionado = {},
        stock,
        editProducto,
        addProducto,
    }
) => {

    const cantidad_persistente = useRef() //=> Evita renderizados innecesarios.

    const { insertarParametros, parametros } = useEstablecerParametros(producto_seleccionado)

    const keysSeleccionado = Object.keys(producto_seleccionado).length

    const keysParametros = Object.keys(parametros).length

    const { nombre, categoria, cantidad } = parametros

    const verificacion = verificacionStock({
        parametros,
        producto_seleccionado,
        addProducto,
        editProducto,
    })

    const onClick = () => {

        verificacion({ cantidad_persistente: cantidad_persistente.current })

        if (keysSeleccionado == 0) {
            insertarParametros({})
        } else {
            alternarMostrar()
        }
    }

    return (
        <Modal
            size="lg"
            show={mostrar}
            backdrop="static"
            onHide={alternarMostrar}>
            <Modal.Header className={`d-flex justify-content-center h-100 ${keysSeleccionado > 0 ? "border-0" : ""} w-100 px-0`} >
                {
                    keysSeleccionado == 0 &&
                    <BuscadorDeProductos
                        stock={stock}
                        insertarParametros={insertarParametros}
                    />
                }
            </Modal.Header>
            <Modal.Body
                className="gap-4 justify-content-center align-items-center d-flex flex-column  h-100"
                style={{ height: "350px" }}>
                <div className="">
                    <p className="m-0 fs-3 text-center">Nombre</p>
                    <p className="text-center fw-normal m-0 fs-3 text-secondary">{keysParametros == 0 ? "No definido" : nombre}</p>
                </div>
                <div className="">
                    <p className="m-0 fs-3 text-center">Categoria</p>
                    <p className="text-center fw-normal m-0 fs-3 text-secondary">{keysParametros == 0 ? "No definido" : categoria}</p>
                </div>
                <div className="">
                    <p className="m-0 fs-3 text-center">Cantidad</p>
                    <CantidadInput
                        cantidad_inicial={cantidad}
                        cantidad_persistente={cantidad_persistente}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex p-1 border-0 justify-content-center">
                <ButtonSombreado
                    onClick={onClick}
                    background={"86d4da"}
                    border={"2c808e"}
                    className="fs-5 transition"
                >
                    {
                        keysSeleccionado > 0 ? "Guardar cambios" : "Agregar producto"
                    }
                </ButtonSombreado>

                <ButtonSombreado
                    onClick={alternarMostrar}
                    background={"808990"}
                    border={"5c636a"}
                    className="fs-5 px-5 transition"
                >
                    Cerrar
                </ButtonSombreado>
            </Modal.Footer>
        </Modal>
    );
}


export default InterfazDeGestionDeProductos