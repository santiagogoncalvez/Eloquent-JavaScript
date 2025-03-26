const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Error al cargar el archivo HTML');
            return;
        }

        let data = new Map();
        data.set("Nomber", "Pepe");
        data.set("Edad", 30);
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(JSON.stringify(data)));;
    });
});

server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});