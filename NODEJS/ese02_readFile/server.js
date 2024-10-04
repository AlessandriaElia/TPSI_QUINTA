import http from 'http';
import url from 'url';
import fs from 'fs';
import mime from 'mime';
import headers from './headers.json' assert {type:'json'};

const PORT = 1337;

const server = http.createServer(function(req, res){
    let method = req.method;
    let fullPath = url.parse(req.url, true);
    let resource = fullPath.pathname;
    let params = fullPath.query; //contiene solo i parametri GET

    console.log(`Richiesta ${method}: ${resource}`);

    if(resource == '/'){
        resource = '/index.html';
    }

    if(!resource.startsWith('/api/')){ //risorsa statica
        resource = './static' + resource; // resource comincia con /
        fs.readFile(resource, function(err,data){
            if(!err)
            {
                let header = {'Content-Type':mime.getType(resource)};
                res.writeHead(200, header);
                res.write(data);
                res.end();
            }
            else{
                res.writeHead(404, headers.html);
                fs.readFile('./static/error.html', function(err,data){
                    if(err)
                    {
                        res.writeHead(404,headers.text);
                        res.write('Pagina non trovata!');
                        
                    }
                    else{
                        res.writeHead(404, headers.html);
                        res.write(data);
                    }
                    res.end();
                })
            }
        })
    }
    else if(resource=='/api/servizio1'){
        res.writeHead(200, headers.json);
        res.write(JSON.stringify({message: `Benvenuto: ${params.nome}`}));
        res.end();
    }
    else if(resource=='/api/servizio2'){
        res.writeHead(200, headers.json);
        res.write(JSON.stringify({message: `Benvenuto: ${params.nome}`}));
        res.end();
    }
    else{
        res.writeHead(404,headers.text);
        res.write('API non disponibile!');
        res.end();
    }
});

server.listen(PORT);
console.log("Server in ascolto sulla porta: " + PORT);