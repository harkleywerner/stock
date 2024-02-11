import { useAlternarComponentes } from "@/hooks//useAlternarComponentes"
import { useForm } from "@/hooks//useForm"
import { memo, useCallback, useState } from "react"
import { Form } from "react-bootstrap"
import { FiltradoPorCategorias } from "../FiltradoPorCategorias"
import { ResultadosDeBusqueda } from "./ResultadosDeBusqueda"

export const BuscadorDeProductos = memo(({ insertarParametros }) => {

    const { changeForm, form } = useForm({ buscador: "" })

    const [categoria, setCategoria] = useState()

    const establecerCategoria = useCallback((id) => {
        setCategoria(prev => id !== prev ? id : undefined)
    }, [])


    const { alternarMostrar, mostrar } = useAlternarComponentes()

    const onBlur = () => {
        const timeOut = setTimeout(() => {
            alternarMostrar(false)
        }, 300)

        return () => clearTimeout(timeOut)
    }

    return (
        <section className="h-100 w-100 d-flex align-items-center justify-content-center">

            <FiltradoPorCategorias
                establecerCategoria={establecerCategoria}
                categoria={categoria} />

            <div className="position-relative w-75 ">
                <Form.Control
                    onFocus={() => alternarMostrar(true)}
                    onBlur={onBlur}
                    className="font py-2 fs-5"
                    name="buscador"
                    type="search"
                    placeholder="Buscar un item..."
                    autoComplete="off"
                    onChange={changeForm}
                    value={form.buscador}
                >
                </Form.Control>

                {
                    mostrar && <ResultadosDeBusqueda
                        mostrar={mostrar}
                        insertarParametros={insertarParametros}
                        buscador={form.buscador}
                        categoria={categoria}
                    />
                }
            </div>


        </section>
    )
})
