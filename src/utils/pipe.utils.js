
export const pipeUtils  = (...funciones) => (estado) => funciones.reduce((acc, fn) => fn(acc), estado);

