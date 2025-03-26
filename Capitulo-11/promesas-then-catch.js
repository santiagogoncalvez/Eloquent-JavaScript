// Ejemplo de funciones asincronas y de promesas, y gestion con then y catch

const data = [
  {
    title: "Apreniendo JavaScript",
    year: 2024,
    isbn: "979-8700179263",
    author: "Santiago",
  },
  {
    title: "Apreniendo React.js",
    year: 2024,
    isbn: "979-8700179263",
    author: "Santiago",
  },
];


// Ejemplo 1:

// Esto va a mostrar los datos
function getDataOriginal() {
  return data;
}

console.log(getDataOriginal());

// Pero esto no va a mostrar los datos ya que se introduce un retardo con setTimeout() y no hay ningun retorno explicito instatanro de getData(), cuando se llama no retorna nada al momento:
function getData() {
  setTimeout(() => {
    return data;
  }, 3000);
}

/*
Funcion parecida pero con promesas (Objeto promise):

-Buena practica: clausula de cierre, intentar escribir los peores casos al inicio de las funciones para devolver el error o salir de la funcion.

  -Resolve() es una funcion para informar el caso de resolucion de la promesa.
  Cambia el estado de la promesa de pendienta a resuelta.

  -Reject() es una funcion para informar el caso de rechazo de la promesa.
  Cambia el estado de la promesa de pendiente a rechazada.
  */



// Ejemplo 2



function getDataWhithPromises() {
  return new Promise((resolve, reject) => {
    if (data.length === 0) {
      reject(new Error("Data is empty"));
    }

    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
}

/*  
    Succes hanlder (contorlador de exito):
    - 'then': es un metodo de promesa que adjunta una devolucion de llamada que se ejecuta cuando se resuelve la promesa.
    Puede recibir 2 parametros:
      El primero es la funcion que se va a llamar cuando tenga exito la función.
      El segundo es la funcion que se va a llamar cuando se rechace la función.

    Failure handler (contorlador de rechazo):
    - 'catch': es es un metodo de promesa que adjunta una devolucion de llamada que se ejecuta cuando se rechace promesa.


*/

getDataWhithPromises()
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err.message);
  });




// Ejemplo 3:
new Promise((_, reject) => reject(new Error("Fail")))
  .then(value => console.log("Handler 1"))
  .catch(reason => {
    console.log("Caught failure " + reason);
    return "nothing";
  })
  .then(value => console.log("Handler 2", value));
// → Caught failure Error: Fail
// → Handler 2 nothing

/*
El controlador catch tambien retorna una promesa que tambien puede ser gestionada.
*/
