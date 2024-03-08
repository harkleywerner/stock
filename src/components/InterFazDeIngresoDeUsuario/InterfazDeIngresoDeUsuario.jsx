import { memo, useCallback } from "react"
import { Modal } from "react-bootstrap"
import { useAcordion } from "../../hooks/useAcordion.hook"
import Usuario from "./Usuario"


const InterfazDeIngresoDeUsuario = memo(({ //La persistencia de quien loggeo es independiente de donde se invoque el modal
    alternarMostrar = () => { },
    mostrar,
    lista_de_usuarios = [],
    setUsuarioLoggeado,
    usuarioLoggeado = {},
    closeButtonOn = true
}) => {

    const { id_usuario } = usuarioLoggeado

    const { accordion, establecerAccordion } = useAcordion()

    const establecerLoggeado = useCallback((usuario) => {
        setUsuarioLoggeado({ ...usuario })
    }, [])

    const orderByLoggeado = (array) => array.sort((a, b) => (a.id_usuario == id_usuario ? -1 : 1))

    return (
        <Modal
            show={mostrar}
            onHide={alternarMostrar}>
            <Modal.Header className="border-0" closeButton={closeButtonOn} >
                <Modal.Title className="text-secondary d-flex border-bottom justify-content-center w-100 text-uppercase mx-2 fs-4 text-truncate">
                    Usuarios
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
            style = {{maxHeight : "400px",minHeight : "400px"}}
            className="scrollbar ">
                {
                    orderByLoggeado([...lista_de_usuarios]).map(item =>
                        <Usuario
                            establecerLoggeado={establecerLoggeado}
                            loggeado={item.id_usuario == id_usuario}
                            establecerAccordion={establecerAccordion}
                            accordion={accordion.includes(item.id_usuario)}
                            key={item.id_usuario}
                            {...item} />)
                }

            </Modal.Body>
        </Modal>
    )
})



export default InterfazDeIngresoDeUsuario