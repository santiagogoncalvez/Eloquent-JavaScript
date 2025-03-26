// Ejemplo de codigo asincrono que utiliza promesas

function asyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2. Operation completed successlly");
    }, 3000);
  });
}

// 1. Inicia la operacion
console.log("1. Start of operation");

// 2. Se registra una promesa
asyncOperation()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

  // 3. Se sigue ejecutando el codigo
console.log("3. The main code continues executing");

// 4. Se resuelve la promesa.
