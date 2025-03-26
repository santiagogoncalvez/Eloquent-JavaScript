// Capitulo 9, ejercicio Regex golf.

function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp == "...") return;
    for (let str of yes) if (!regexp.test(str)) {
        console.log(`Failure to match ${str}`);
    };
    for (let str of no) if (regexp.test(str)) {
        console.log(`Unexpected match for ${str}`);
    };
};

// Punto 1
verify(/ca[rt]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

// punto 2
verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

// punto3
verify(/ferr(et|y|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

//    pounto 4
verify(/ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

// Punto 5
verify(/\s[.,:;]/,
    ["bad punctuation ."],
    ["escape the period"]);

// punto 5
verify(/\w{7}/,
    ["Siebentausenddreihundertzweiundzwanzig"],
    ["no", "three small words"]);


verify(/\b[^e\s\W]+\b/i,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]);

