import http from 'http';
import dispatcher from './dispatcher';
import headers from './headers.json';
import people from './people.json';

const PORT = 1337;

// La callback di createServer viene eseguita ogni volta che arriva una richiesta dal client
const server = http.createServer(function(req, res) { 
    dispatcher.dispatch(req, res);
});

server.listen(PORT, function() {
    console.log(`Server listening on port: ${PORT}`);
});

/*** Registrazione dei listener ***/
dispatcher.addListener('GET', '/api/country', function(req: any, res: any) {
  const countries : string[]= [];  
  for (const person of people.results){
    if(!countries.includes(person.location.country)){
      countries.push(person.location.country);
      }
    }
    countries.sort();

    res.writeHead(200, headers.json);
    res.write(JSON.stringify(countries)); //i dati viaggiano sempre serializzati
    res.end();
});
dispatcher.addListener('GET', '/api/people', function(req:any, res:any){
  const country = req['GET']['country']; // dentro req[get] trovo tutti i parametri GET

  res.WriteHead(200, headers.json);
  res.write(JSON.stringify());
  res.end();
})
