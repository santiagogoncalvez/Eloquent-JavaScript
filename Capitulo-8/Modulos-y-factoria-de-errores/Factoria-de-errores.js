// Factoria de errores
const createErrorFactory = function (name) {
    return class CustomizedError extends Error {
        constructor(message) {
            super(message);
            this.name = name;
        };
    };
};

export const CreateConnectionError = createErrorFactory("ConnectionError");

export const CreateValidationError = createErrorFactory("ValidationError");
