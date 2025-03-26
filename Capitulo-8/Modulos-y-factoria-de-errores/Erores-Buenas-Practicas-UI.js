import {CreateConnectionError, CreateValidationError} from "./Factoria-de-errores";
import {validateUser} from "./Validaciones";

const name = "Pepe";
const age = 20;
const email = "pepe@gmail.com";


try {
    validateUser({ name, age, email });
} catch (e) {
    if (e instanceof CreateConnectionError) {
        // retry after a few seconds
        setTimeout(() => {
            validateUser({ name, age, email})
        });
    };

    if (e instanceof CreateValidationError) {
        // showUIModalValidation()
        console.log("Error");
    };
};
