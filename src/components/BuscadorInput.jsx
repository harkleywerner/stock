import { Form, InputGroup } from "react-bootstrap"
import { useForm } from "@/hooks/useForm"
import { memo, useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

const Input = () => {

    const [search, setSearch] = useSearchParams()

    const getSearch = search.get("search") || ""

    const { form, changeForm,restablecerFormulario } = useForm({ "buscador": getSearch  })

    const {pathname} = useLocation()

    const { buscador } = form
      

    useEffect(()=>{

        if(form.buscador.length > 0){
            restablecerFormulario()
        }

    },[pathname])

    useEffect(() => {

        search.delete("search")

        if (buscador.length == 0) return setSearch(`${search.toString()}`)
        search.append("search", form.buscador)
        setSearch(`?${search.toString()}`);


    }, [buscador])


    return (
        <Form.Control
            type="search"
            value={getSearch.length == 0 ? "" : buscador}
            name="buscador"
            className={` font border-0  d-sm-inline text-white fw-medium fs-5`}
            style={{ boxShadow: "none", background: "transparent" }}
            onChange={changeForm}
            placeholder={`Buscar`}
            autoComplete="off"
            aria-label={`Busqueda`} />
    )

}

const BuscadorInput = memo(() => {

    return (
        <div
            className="rounded-5 p-1 border border-2"
            style={{ background: "trasparent" }}>
            <InputGroup className="cursor-pointer">
                <InputGroup.Text
                    style={{ background: "transparent" }}
                    className="text-center border-0 m-auto m-md-0 p-0" >
                    <i className="fa-solid text-white p-2 mx-1 fa-magnifying-glass "></i>
                </InputGroup.Text>
                <Input />
            </InputGroup>
        </div>
    )
})

export default BuscadorInput