// Ejercicio la caja robada, capitulo 8.

const box = {
    locked: true,
    unlock() { this.locked = false },
    lock() { this.locked = true },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked box!");
        return this._content;
    }
};

function withUnlockedBox(body) {
    if (!box.locked) {
        return body()
    };

    box.unlock();
    try {
        return body();
    } finally {
        box.lock()
    };
};

withUnlockedBox(
    function () {
        box.content.push("Gold key");
    }
);

try {
    withUnlockedBox(function () { throw new Error("Pirates on the horizont! Abort!"); });
} catch (e) {
    console.log("Error raised " + e);
};

console.log(box.locked);

withUnlockedBox(function () { console.log(box.content) });