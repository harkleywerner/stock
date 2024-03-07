export const numeroDeDosDigitosUtils = (numero) => {
    const stringNumero = numero.toString()
    return stringNumero.length <= 1 ? `0${numero}` : numero
};

