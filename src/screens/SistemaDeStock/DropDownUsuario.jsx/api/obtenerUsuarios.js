const obtenerUsuarios = async () => {

    const body = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuarios`, body)
    
  
    const json = await res.json()

    if (!res.ok || json.error) {
        throw new ErrorEvent(404)
    }


    return json

}

export default obtenerUsuarios