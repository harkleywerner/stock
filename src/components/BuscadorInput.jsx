import { Form, InputGroup } from "react-bootstrap"
import { useForm } from "@/hooks/useForm"
import { memo, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const BuscadorInput = memo(({ texto = "", }) => {

    const { form, changeForm } = useForm({ "buscador": "" })

    const [search, setSearch] = useSearchParams()

    const [isTyping, setTyping] = useState()

    const searching = search.get("search") || ""

    const { buscador } = form

    useEffect(() => {

        !isTyping && setTyping(true)

        const timeoutSearch = setTimeout(() => {

            if (buscador.length == 0) return setSearch("")

            search.delete("search")
            search.append("search", form.buscador)
            setSearch(`?${search.toString()}`);
            setTyping(false)

        }, 600);

        return () => clearTimeout(timeoutSearch)

    }, [buscador])

    return (
        <div
            className="rounded-5 p-1 border border-2"
            style={{ background: "traparent" }}>
            <InputGroup className="cursor-pointer">
                <InputGroup.Text
                    style={{ background: "transparent" }}
                    className="text-center border-0 m-auto m-md-0 p-0" >
                    <i className="fa-solid text-white p-2 mx-1 fa-magnifying-glass "></i>
                </InputGroup.Text>
                <Form.Control
                    type="search"
                    value={isTyping ? buscador : searching}
                    name="buscador"
                    className={` border-0 d-sm-inline fw-medium fs-4`}
                    style={{ boxShadow: "none", background: "transparent" }}
                    onChange={changeForm}
                    placeholder={`Buscar ${texto}`}
                    autoComplete="off"
                    aria-label={`Busqueda de ${texto}`} />
            </InputGroup>
        </div>
    )
})

export default BuscadorInput