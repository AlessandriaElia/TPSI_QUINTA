const http = require('http');
const url = require('url');

const PORT = 1337;

const server = http.createServer(function(req, res){
    let method = req.method;
    let fullPath = url.parse(req.url, true); // il true consente di parsificare anche i parametri che altrimenti verrebbero passati come stringa
    let resource = fullPath.pathname;
    let params = fullPath.query;
    let domain = req.headers.host;

    console.log("Richiesta ricevuta: " + resource);

    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.write(`<h1>Informazioni relative alla richiesta ricevuta</h1>`);
    res.write(`<br>`);
    res.write(`<p>Nome del dominio: ${domain} </p>`);
    res.write(`<p>Metodo della richiesta: ${method} </p>`);
    res.write(`<p>Risorsa richiesta: ${resource} </p>`);
    res.write(`<p>Parametri: ${JSON.stringify(params)} </p>`);
    res.end();
});
server.listen(PORT); // se non si specifica come primo parametro l'indirizzo ip, il server ascolta su tutte le interfacce disponibili
console.log("Server in ascolto sulla porta: " + PORT);