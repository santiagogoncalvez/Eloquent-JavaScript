// Codigo asincrono que utiliza la syntactic sugar async-await

/*
Prioridad de tareas de JavaScript:
    1. Tareas de JavaScript
    2. MicroTareas de WebAPI
    3. Tareas de WebAPI
*/

const users = [
    {
        name: "Pepe",
        age: 20
    },
    {
        name: "Mario",
        age: 21
    },
    {
        name: "Roman",
        age: 30
    }
];


function getDataBase() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("4. Cuarto esto")
            resolve(users)
        }, 4000)
    });
};

async function getData() {
    try {
        console.log("2. Segundo esto")
        let user = await getDataBase();
        console.log("Ultimo: mostrar los datos.")
        console.log(user);
    } catch (err) {
        console.log(err.massage)
    };
};

console.log("1. Primero esto")
getData()

console.log("3. Tercero esto")


/*
- await espera una promesa, por lo tanto lo que llama await debe retornar el resolve de la promesa con lo que queremos que nos devuelva.
*/

// Tambien se puede usar await a nivel alto (top level) si tener que usarlo dentro de una funcion async:


function getDataBase() {
    return new Promise((resolve, reject) => {
        try {
            console.log("2. Segundo esto")
            setTimeout(() => {
                console.log("3.tercero esto")
                resolve(users);
            }, 4000);
        } catch (err) {
            reject(err)
        };
    })
};

console.log("1. Primero esto");

let books = await getDataBase();
console.log(books);
console.log("hola")






