"use strict"

let currentCountry // nazione attualmente selezionata

// vettore enumerativo delle Persone attualmente visualizzate
// Comodo per gestire i pulsanti di navigazione
let people;  
// Posizione del dettaglio corrente (rispetto al vettore enumerativo people)     
let currentPos;   


window.onload = async function() {
    let _lstNazioni = $("#lstNazioni");
    let _tabStudenti = $("#tabStudenti");
    let _divDettagli = $("#divDettagli");
    let _buttonNazioni = $("#buttonNazioni");

    _divDettagli.hide();

    let countries = await inviaRichiesta('GET', '/api/country');
    if(countries){
        console.log(countries);
        for(const country of countries){
            $('<a>').addClass("dropdown-item").prop("href" , "#").text(country).appendTo(_lstNazioni).on("click", function(){
                const selectedCountry = $(this).text(); //this.textContent
                _buttonNazioni.text(selectedCountry);
                showPeople(selectedCountry);
            });
        }
    }
};
function showPeople(selectedCountry){
    const people = await inviaRichiesta('GET', '/api/people', {'country':selectedCountry});
    if(people){
        console.log(people);
    }
}