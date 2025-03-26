// Ejercicio Reintentar
class MultiplicatorUnitFailure extends Error {
    constructor(message) {
        super(message);
        this.name = "multiplicator unit failure";
    }
}

function primitiveMultiply(number1, number2) {
    if (Math.random() < 0.2) {
        return number1 * number2;
    } else {
        throw new MultiplicatorUnitFailure("numbers cannot be multiplied");
    };
};

function reliableMultiply(a, b) {
    for (; ;) {
        try {
            return primitiveMultiply(a, b);
        }
        catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                console.log("Numbers cannot be multiplied. Try again");
                console.log(e.name);
            } else {
                throw e;
            }
        };
    };
};

console.log(reliableMultiply(2,6));