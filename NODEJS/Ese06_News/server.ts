import http from 'http';
import dispatcher from './dispatcher';
import headers from './headers.json';
import news from './news.json';
import fs from 'fs';

const PORT = 1337;

// La callback di createServer viene eseguita ogni volta che arriva una richiesta dal client
const server = http.createServer(function(req, res) { 
    dispatcher.dispatch(req, res);
});

server.listen(PORT, function() {
    console.log(`Server listening on port: ${PORT}`);
});

/*** Registrazione dei listener ***/
dispatcher.addListener('GET', '/api/elenco', function(req: any, res: any) {
  res.writeHead(200, headers.json);
    res.write(JSON.stringify(news));
    res.end();
    console.log(news);
});
dispatcher.addListener('POST', '/api/dettagli', function(req:any, res:any){
  let fileName = req["BODY"].file;  // Assumendo che il nome del file sia inviato nel corpo della richiesta
  const newsFilePath = __dirname + '/news/' + fileName;  // Percorso del file della notizia
  const notizieFilePath = __dirname + '/news.json';      // Percorso del file notizie.json
  

    // Leggi il file notizie.json per trovare la notizia corrispondente
    fs.readFile(notizieFilePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, headers.json);
            res.write(JSON.stringify({ error: 'Errore nella lettura del file notizie.json' }));
            res.end();
            return;
        }

        let notizie = JSON.parse(data);
        let notizia = notizie.find((n: any) => n.file === fileName);

        if (!notizia) {
            res.writeHead(404, headers.json);
            res.write(JSON.stringify({ error: 'Notizia non trovata' }));
            res.end();
            return;
        }

        // Leggi il contenuto del file della notizia
        fs.readFile(newsFilePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, headers.json);
                res.write(JSON.stringify({ error: 'Errore nella lettura del file della notizia' }));
                res.end();
                return;
            }

            // Incrementa il numero di visualizzazioni
            notizia.visualizzazioni += 1;

            // Aggiorna il file notizie.json con le nuove visualizzazioni
            fs.writeFile(notizieFilePath, JSON.stringify(notizie, null, 2), 'utf8', (err) => {
                if (err) {
                    res.writeHead(500, headers.json);
                    res.write(JSON.stringify({ error: 'Errore nell\'aggiornamento delle visualizzazioni' }));
                    res.end();
                    return;
                }

                // Rispondi con il contenuto della notizia
                res.writeHead(200, headers.json);
                res.write(JSON.stringify({ file: content }));
                res.end();
            });
        });
    });
})
