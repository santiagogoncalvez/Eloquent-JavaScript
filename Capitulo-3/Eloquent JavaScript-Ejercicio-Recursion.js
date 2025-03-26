// Funcion recursiva: numero par
function esPar(valor) {

    function restar(valor) {
        if (valor == 0) {
            return true;
        } else if (valor == 1) {
            return false;
        } else {
            if (valor < 0) {
                return restar(valor + 2)
            } else {
                return restar(valor - 2);
            }
        }
    }

    return restar(valor);
}

/* Nota: si se ingresa un valor negativo cuando se haga la resta (-2) 
el numero se va a achicar cada vez mas y nunca se llegaria al 0 o al uno. 
Entonces si se ingresa un numero negativo en vez de restar hay que sumar. */
console.log(esPar(-10))