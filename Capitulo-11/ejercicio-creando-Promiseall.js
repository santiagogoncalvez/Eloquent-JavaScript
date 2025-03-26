// Eercicio construyendo Promise.all
function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let pending = promises.length;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(result => {
                // Esta parte controla que cada elemento resultado se ubique en la misma posicion que su promesa origien
                results[i] = result;
                pending--;

                // Esta verificación de pennding == 0, se hace para ver si el array de promesas que se paso es un array vacío, y si es así retorna un array vacío;
                if (pending == 0) resolve(results);
            }).catch(reject);
        }
        if (promises.length == 0) resolve(results);
    });
}




let promise1 = () => {
    return new Promise((resolve, reject) => {
        let flag = true;
        if (flag) resolve(flag);
        if (!flag) reject(flag);
    }
    );
}

let promise2 = () => {
    return new Promise((resolve, reject) => {
        let flag = true;
        if (flag) resolve(flag);
        if (!flag) reject(flag);
    }
    );
}


// Test code Promise_all
Promise_all([]).then(array => {
    console.log("This should be []:", array);
});
function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500);
    });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)]).then(array => {
    console.log("We should not get here");
}).catch(error => {
    if (error != "X") {
        console.log("Unexpected failure:", error);
    }
});


Promise_all([promise1(), promise2()]).then((array) => {
    console.log("Results of promise1 and promise2:", array);
});