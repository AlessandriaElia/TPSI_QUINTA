"use strict"

let currentCountry // nazione attualmente selezionata

// vettore enumerativo delle Persone attualmente visualizzate
// Comodo per gestire i pulsanti di navigazione
let people;  
// Posizione del dettaglio corrente (rispetto al vettore enumerativo people)     
let currentPos;   


window.onload = async function() {
    let _lstNazioni = $("#lstNazioni");
    let tabStudenti = $("#tabStudenti");
    let _divDettagli = $("#divDettagli");
    let _buttonNazioni = $("#buttonNazioni");

    _divDettagli.hide();

    let countries = await inviaRichiesta('GET', '/api/country');
    if(countries){
        console.log(countries);
        for(const country of countries){
            $('<a>').addClass("dropdown-item").prop("href" , "#").text(country).appendTo(_lstNazioni).on("click", function(){
                const selectedCountry = this.textContent; //this.textContent $(this).text()
                //_buttonNazioni.text(selectedCountry);
                $(this).parent().parent().children('button').text(selectedCountry);
                showPeople(selectedCountry);
            });
        }
    }
    async function showPeople(selectedCountry){
        const people = await inviaRichiesta('GET', '/api/people', {'country':selectedCountry});
        if(people){
            console.log(people);
            tabStudenti.empty(); 
            people.forEach(person => {
                let tr = $('<tr>').appendTo(tabStudenti);
                $('<td>').appendTo(tr).text(`${person.name.title} ${person.name.first} ${person.name.last}`);
                $('<td>').appendTo(tr).text(`${person.location.city}`);
                $('<td>').appendTo(tr).text(`${person.location.state}`);
                $('<td>').appendTo(tr).text(`${person.cell}`);
                $('<td>').appendTo(tr).append($('<button>').text('Dettagli').on("click", function(){
                    showDetails(person.name);
                }));
                $('<td>').appendTo(tr).append($('<button>').text('Elimina').on("click", function(){
                    deletePerson(person);
                }));            
            })
        }
    }
    async function showDetails(name){
        const person = await inviaRichiesta('GET', '/api/getDetails', name);
        if(person){
            console.log(person);
            const img = _divDettagli.find('.card-img-top');
            const title = _divDettagli.find('.card-title');
            const text = _divDettagli.find('card-text');

            img.prop('src', person.picture.large);
            title.text(`${person.name.title} ${person.name.first} ${person.name.last}`);
            text.html(`<b>Address</b>: ${JSON.stringify(person.location)}`);
        }
        _divDettagli.show();
    }
    async function deletePerson(pName){
        const data = await inviaRichiesta('DELETE', '/api/deletePerson', {pName});
        if(data){
            console.log(data);
            alert('Utente eliminato correttamente');
            const selectedCountry = $('#dropdownMenuButton').text();
            showPeople(selectedCountry);
        }
    }
};