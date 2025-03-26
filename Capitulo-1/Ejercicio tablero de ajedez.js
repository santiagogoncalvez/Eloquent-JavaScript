// Tablero de ajedres con #

let string = "\n";
for (i = 0; i < 8; i++){

  if(i == 0){
 
  }
    for (j = 0; j < 8; j++) {

        if (i % 2 != 0) {
            string += " #";
        } else {
            string += "# ";
        }
    }
    string += "\n"
};

console.log(string)