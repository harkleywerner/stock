export const catchPromiseHandler = ({
    error,
    intentos,
    generatePromise,
    setLoader,
    establecerApiData,
    nav,
    shortId,
    promesa,
    establecerAlerta
}) => {



    const request = error?.request?.status ?? 200

    if (intentos === undefined && request != 401 && error?.code == "ERR_CANCELED") {

        const res = error?.response?.data
        const message = res?.message

        establecerAlerta({
            id: shortId,
            data: {
                message: message ?? error.message,
                code: request || error.code,
                method: error.config.method,
                url: promesa.url,
            },
            not_retry: promesa?.not_retry,
            generatePromise: ({ intentos }) => generatePromise({ promesa, intentos })
        })
    }

    setLoader(false)

    const redirect = error?.response?.data?.redirect

    if (redirect) {
        // nav(`/${redirect == "/" ? "sucursales" : redirect}`)
    }

    establecerApiData({ promesa, response: error?.response })

    return {
        status: "failed"
    }
}