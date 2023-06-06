/* Simplifica el manejo de errores alrededor de funciones asíncronas
 y evitar la necesidad de utilizar bloques try-catch repetitivos. */

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;