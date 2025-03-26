/*
Patrones de la funciones generadoras. Comunicación bidireccional ("two-way").
*/

//Patrón 1
/*
Enviar un valor a la función generadora.
El "yield" de la función recibe un dato.
Suelen usarse en interacciones de tipo diálogo (interfaz conversacional).
*/

function* questionGenerator() {
   const name = yield "What´s your name?";
   const quest = yield `Hi ${name}, what is your quest?`;
   yield `To seek the ${quest}`;
}

const generator = questionGenerator();

console.log(generator.next().value);
console.log(generator.next("Santiago").value);
console.log(generator.next("Holy grail").value);

// Patrón 2
/*
Delegar ejecuciones con "yield".
Si se le pone un asterisco a la palabre clave "yield" (yield*) esto hace que "yield" delega la iteración a otro generador u objeto iterable. Permite componer generadores más complejos a partir de otros más pequeños.
*/

function* numberGenerator() {
   yield 1;
   yield 2;
}

function* alphabeticGenerator() {
   yield "a";
   yield "b";
}

function* combinedGenerator() {
   yield* numberGenerator();
   yield* alphabeticGenerator();
}

let value;
for (value of combinedGenerator()) {
   console.log(value);
}

// Patrón 3
/*
Combinar generadores con promesas.
Crear un codigo asíncrono escrito de una manera secuencial ("pseudo-sincrono").
Son útiles al lidiar con peticiones asíncronas.
*/

async function* fetchUsersPage(pageNumber) {
   const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${pageNumber}`
   );
   const data = await response.json();
   console.log(data);
   yield data;
}

async function displayUsers() {
   let currentPage = 1;

   while (true) {
      const generator = fetchUsersPage(currentPage);
      const result = await generator.next();
      const users = result.value;

      if (users.length === 0 || currentPage > 10) {
         //No more users
         break;
      }

      // Process and display the fetched users
      console.log(`User: ${users.id}, name: ${users.name}`);

      currentPage++;
   }
}

displayUsers();
