import http from 'http';
import app from './dispatcher';
import headers from './headers.json';
import facts from './facts.json';
import fs from 'fs';

const PORT = 1337;
// const categories = []
const categories = ["career","money","explicit","history","celebrity","dev","fashion","food","movie","music","political","religion","science","sport","animal","travel"]

const icon_url = "https://assets.chucknorris.host/img/avatar/chuck-norris.png";
const api_url = "https://api.chucknorris.io"

const base64Chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"]


// La callback di createServer viene eseguita ogni volta che arriva una richiesta dal client
const server = http.createServer(function(req, res) { 
    app.dispatch(req, res);
});

server.listen(PORT, function() {
    console.log(`Server listening on port: ${PORT}`);
});

/*** Registrazione dei listener ***/
app.addListener('GET', '/api/categories', function(req:any, res:any){
    res.writeHead(200, headers.json);
    res.write(JSON.stringify(categories));
    res.end();
    
})
app.addListener('GET', '/api/facts', function(req:any,res:any){
    const category = req["GET"].category;
    const filteredFacts = facts.facts
    .filter(fact => fact.categories.includes(category)) 
    .sort((a, b) => b.score - a.score);  
    res.writeHead(200, headers.json);
    res.write(JSON.stringify(filteredFacts));
    res.end();
    console.log(filteredFacts);
})
app.addListener('POST', '/api/rate', function(req:any, res:any){
    const selectedIds = req["BODY"].ids;
    facts.facts.forEach(fact => {
        if (selectedIds.includes(fact.id)) {
            fact.score += 1;  
        }
    });

    res.writeHead(200, headers.json);
    res.write(JSON.stringify({ message: "OK", facts }));
    res.end();

})
app.addListener('POST', '/api/add', function(req:any, res:any){
    const { categoria, value } = req["BODY"];

    const newFactId = generateUniqueId();
    const newFact = {
        id: newFactId,
        value: value,
        categories: [categoria], 
        created_at: new Date().toISOString(), 
        updated_at: new Date().toISOString(),
        url: api_url, // URL fisso
        icon_url: icon_url, // Icona fissa
        score: 0 // Punteggio iniziale
    };

    facts.facts.push(newFact);
    res.writeHead(200, headers.json);
    res.write(JSON.stringify({ status: 'OK' }));
    res.end();

})
function generateUniqueId(): string {
    let id: string;
    do {
        id = Array.from({ length: 22 }, () => base64Chars[Math.floor(Math.random() * base64Chars.length)]).join('');
    } while (facts.facts.some(fact => fact.id === id));
    return id;
}
