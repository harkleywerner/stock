import { useCallback, useState } from "react";
import shortUUID from "short-uuid";

export const useToast = () => { //=> pasar a useToast

    const [toasts, setToats] = useState([])

    const removerToast = useCallback((id) => {
        setToats(prev => {
            return prev.filter(item => item.id !== id)
        })
    }, [])

    const establecerToast = useCallback((nuevoToast) => {
        const generarID = shortUUID.generate()
        const toast = { ...nuevoToast, id: generarID }

        return new Promise((res) => {
            setToats(prev => {

                res(toast)

                if (prev.length >= 3) {
                    const nuevoPrev = [...prev]
                    nuevoPrev.splice(0, 1)
                    nuevoPrev.splice(prev.length - 1, 0, toast)
                    return nuevoPrev
                } else {
                    return [...prev, toast]
                }


            })
        })
            .then((oldItem) => {

                setTimeout(() => {
                    setToats(prev => {
                        if (prev.find(i => i.id == oldItem.id) == undefined) {
                            return prev
                        }

                        return prev.slice(1)
                    })
                }, 5000);

            })
    }, [])


    return {
        toasts,
        establecerToast,
        removerToast
    }
};
