import fs from 'fs';
import states from './states.json';
import radios from './radios.json';

states.forEach(state=>{
    const filteredRadios = radios.filter(radio => {
        return radio.state == state.name;
    })
    console.log(JSON.stringify(filteredRadios));
    state.stationcount = filteredRadios.length.toString();
})
console.log(JSON.stringify(states));

fs.writeFile('./states.json', JSON.stringify(states), (err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log('Database aggiornato correttamente');
    }
})