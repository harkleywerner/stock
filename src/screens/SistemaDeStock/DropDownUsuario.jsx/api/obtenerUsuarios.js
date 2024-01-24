const obtenerUsuarios = async () => {

    const body = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuarios`, body)
    return await res.json()

}

export default obtenerUsuarios