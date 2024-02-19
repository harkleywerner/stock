

export const groupByUtils = ({ propiedad, array = [] }) => {

    return array.reduce((acc, current) => {
        acc[current[propiedad]] = current
        return acc
    }, {})

};