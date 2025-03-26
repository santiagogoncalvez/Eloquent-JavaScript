/* 
Sucesion de fibonacci
0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
Crear diferentes funciones para calcular esta secuencia.
*/

function fibonacci() {
   let numbers = [];
   for (let i = 0; i < 50; i++) {
      if (i == 0 || i == 1) {
         numbers.push(i);
         console.log(numbers[i]);
         continue;
      }

      numbers.push(numbers[i - 1] + numbers[i - 2]);
      console.log(numbers[i]);
   }
}

// fibonacci();

function fibonacciString() {
   let strFibonacci = "";
   let numbers = [];
   for (let i = 0; i < 50; i++) {
      if (i == 0) {
         numbers.push(i);
         strFibonacci += `${String(numbers[i])}`;
         continue;
      }

      if (i == 1) {
         numbers.push(i);
         strFibonacci += ` ${String(numbers[i])}`;
         continue;
      }

      numbers.push(numbers[i - 1] + numbers[i - 2]);
      strFibonacci += ` ${String(numbers[i])}`;
   }

   return strFibonacci;
}

// console.log(fibonacciString());

function fibonacci2() {
   let current;
   let previous;
   let aux;

   for (let i = 0; i < 50; i++) {
      if (i == 0) {
         console.log(i);
         previous = i;
         continue;
      }
      if (i == 1) {
         console.log(i);
         current = i;
         continue;
      }

      aux = current;
      current = current + previous;
      previous = aux;

      console.log(current);
   }
}

// fibonacci2();

function* fibonacciGenerator() {
   let numbers = [];
   for (let i = 0; i < 50; i++) {
      if (i == 0 || i == 1) {
         numbers.push(i);
         yield numbers[i];
         continue;
      }

      numbers.push(numbers[i - 1] + numbers[i - 2]);
      yield numbers[i];
   }
}

let iteratorFibonacci = fibonacciGenerator();
for (number of iteratorFibonacci) {
   // console.log("Number:", number);
}

// Funcion Fibonacci  recursiva:
function recursiveFibonacci(n) {
   // Siempre en las fucniones recursivas escribir la clausula de escape primero
   if (n === 1) return 0;
   if (n === 2) return 1;

   return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}

console.log(recursiveFibonacci(10));

// Despúes se puede crear una funcion fibonacci que empiece en un punto cualquiera:
function fibonacciFromOnePoint(n, from = 0) {
   if (from !== 0) {
      if (n === 1) return from;
      if (n === 2) return from + from;

      return (
         fibonacciFromOnePoint(n - 1, from) + fibonacciFromOnePoint(n - 2, from)
      );
   }

   if (n === 1) return 0;
   if (n === 2) return 1;

   return (
      fibonacciFromOnePoint(n - 1, from) + fibonacciFromOnePoint(n - 2, from)
   );
}

console.log(fibonacciFromOnePoint(10, 7));

// Función recursiva
function fibonacci1(n) {
   if (n === 1) return 0;
   if (n === 2) return 1;

   return fibonacci1(n - 1) + fibonacci1(n - 2);
}

console.log("");
console.log("Función recursiva:");
console.log(fibonacci1(1));
console.log(fibonacci1(2));
console.log(fibonacci1(3));
console.log(fibonacci1(4));
console.log(fibonacci1(5));
console.log(fibonacci1(6));
console.log(fibonacci1(7));
console.log(fibonacci1(8));
console.log(fibonacci1(9));
console.log(fibonacci1(10));

//Función común
function fibonacci2(n) {
   if (n === 1) return 0;
   if (n === 2) return 1;

   let current,
      last = 1,
      secondLast = 0,
      i;
   for (i = 3; i <= n; i++) {
      current = last + secondLast;
      secondLast = last;
      last = current;
   }

   return current;
}

console.log("");
console.log("Función común:");
console.log(fibonacci2(1));
console.log(fibonacci2(2));
console.log(fibonacci2(3));
console.log(fibonacci2(4));
console.log(fibonacci2(5));
console.log(fibonacci2(6));
console.log(fibonacci2(7));
console.log(fibonacci2(8));
console.log(fibonacci2(9));
console.log(fibonacci2(10));

//Función generadora
function* fibonacci3() {
   yield 0;
   yield 1;

   let current,
      last = 1,
      secondLast = 0;
   while (true) {
      current = last + secondLast;
      secondLast = last;
      last = current;

      yield current;
   }
}

let fibonacciGenerator = fibonacci3();

console.log("");
console.log("Función generadora:");
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
console.log(fibonacciGenerator.next().value);
