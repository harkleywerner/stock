import { useAlternarComponentes } from "@/hooks//useAlternarComponentes"
import { useForm } from "@/hooks//useForm"
import { memo, useCallback, useState } from "react"
import { Form } from "react-bootstrap"
import { FiltradoPorCategorias } from "./FiltradoPorCategorias"
import { ResultadosDeBusqueda } from "./ResultadosDeBusqueda/ResultadosDeBusqueda"

export const BuscadorDeProductos = memo(({ insertarParametros, stock }) => {

    const { changeForm, form } = useForm({ buscador: "" })

    const [categoria, setCategoria] = useState()

    const establecerCategoria = useCallback((id) => {
        setCategoria(prev => id !== prev ? id : undefined)
    }, [])

    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const onBlur = (e) => {
        const timeOut = setTimeout(() => {
            alternarMostrar(false)
        }, 100)

        return () => clearTimeout(timeOut)
    }

    return (
        <section
            className="h-100 w-100 d-flex align-items-center justify-content-center">

            <FiltradoPorCategorias
                establecerCategoria={establecerCategoria}
                categoria={categoria} />

            <div className="position-relative align-items-center d-flex w-75  ">

                <Form.Control
                    id="input_buscador"
                    onFocus={() => alternarMostrar(true)}
                    style={{ border: `${mostrar ? "1px solid #57BDC67F" : ""}`, boxShadow: "none" }}
                    className="py-2 fs-5 "
                    name="buscador"
                    type="search"
                    placeholder="Buscar un item..."
                    autoComplete="off"
                    onChange={changeForm}
                    value={form.buscador}
                >
                </Form.Control>

                {
                    <ResultadosDeBusqueda
                        stock={stock}
                        mostrar={mostrar}
                        alternarMostrar={onBlur}
                        insertarParametros={insertarParametros}
                        buscador={form.buscador}
                        categoria={categoria}
                    />
                }


            </div>
            <i
                onClick={onBlur}
                style={{ right: "-30px", color: "#DE4E75" }}
                className="fa-solid fa-square-xmark cursor-pointer transition ms-1 fs-3"></i>
        </section>
    )
})
