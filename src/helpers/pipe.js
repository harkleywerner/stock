
const pipe  = (...funciones) => (estado) => funciones.reduce((acc, fn) => fn(acc), estado);


export default pipe
