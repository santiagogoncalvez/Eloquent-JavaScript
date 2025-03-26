import {CreateConnectionError, CreateValidationError} from "./Factoria-de-errores";

/*
Crear una clase que va representar un tipo de error, y por este motivo va a ser una extension de la clase Error.
Ahora los errores no son tan generales sino que son mas especificos.
*/
export const validateUser = ({ name, age, email } = {}) => {
    if (!name) throw new CreateValidationError("name is required");
    if (!age) throw new CreateValidationError("Age is required");
    if (!email) throw new CreateValidationError("Email is required");

    // Llamar a la base de datos para guardar el usuario
    try {
        // Codigo
    } catch (e) {
        // Por ejemplo: enviar traza original a un servicio nuestro
        // sendBeaconError(e)
        throw new CreateConnectionError("database is not available");
    };

};