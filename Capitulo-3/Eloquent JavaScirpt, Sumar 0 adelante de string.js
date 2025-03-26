// Sumar 0  adelante de string para igualar el tamaño para mostarlo despues en consola
function granja (pollos, gallinas) { 
  
    let stringPollos = String(pollos);
    while (stringPollos.length < 3) {
      stringPollos = `0` + stringPollos;
    };
    console.log(`${stringPollos}` + ` Pollos`);
    
   
    let stringGallinas = String(gallinas);
    while(stringGallinas.length < 3) {
      stringGallinas = `0` + stringGallinas;
    };
    console.log(`${stringGallinas}` + ` Gallinas`);
  };
  
  granja(4,50)