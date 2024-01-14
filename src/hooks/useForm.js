import { useCallback, useState } from "react"


export const useForm = (intialInput = {}) => {

    const [form, setForm] = useState(intialInput)

    const changeForm = useCallback(({ target }) => {
        const { name, value } = target
        
        setForm(form => ({ ...form, [name]: value }))

    }, [])

    const onSubmit = (evento) => {
        evento.preventDefault()
    }


   const restablecerFormulario = () => {
          setForm(intialInput)
    } 
    

    return {
        onSubmit,
        changeForm,
        form,
        setForm,
        restablecerFormulario
    }
}