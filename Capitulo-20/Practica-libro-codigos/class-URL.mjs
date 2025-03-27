let baseUrl = "https://developer.mozilla.org";

//object URL
console.log("▶︎ Url object");

let A = new URL("en-US/docs", baseUrl);
console.log(A);

let B = new URL(baseUrl);
console.log(B);

//URL.href: Un 'stringifier que devuelve una cadena que contiene la URL completa
console.log("\n▶︎ Url.href");

console.log(new URL("en-US/docs", B).href);

let D = new URL("en-Us/docs", B);

console.log(new URL("/en-US/docs", D).href);

console.log(new URL("en-US/docs", A).href);

console.log(
   new URL("/en-US/docs", "https://developer.mozilla.org/fr-FR/toto").href
);

//URL.pathname: Una cadena que contiene una inicial '/' seguida de la ruta de la URL, sin incluir la cadena de consulta o el fragmento.
console.log("\n▶︎ Url.pathname");
console.log(new URL("en-US/docs", B).pathname);
console.log(
   new URL("/es-Es/images", "https://developer.mozilla.org/fr-FR/toto").pathname
);
