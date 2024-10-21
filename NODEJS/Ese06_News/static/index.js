$(document).ready(function() {
    // Carica l'elenco delle notizie al caricamento della pagina
    inviaRichiesta('GET', '/api/elenco').then(function(data) {
        if (!data) return; // Se c'è stato un errore
        let wrapper = $('#wrapper');
        wrapper.empty();  // Pulisce eventuali contenuti preesistenti

        data.forEach(function(notizia) {
            // Crea il codice HTML per ogni notizia
            let newsHtml = `
                <span class="titolo">${notizia.titolo}</span>
                <a href="#" class="leggi" data-file="${notizia.file}">Leggi</a>
                <span class="nVis">[visualizzato ${notizia.visualizzazioni} volte]</span>
                <br>`;
            wrapper.append(newsHtml);
        });
    }).catch(function(err) {
        console.error("Errore nel caricamento delle notizie: ", err);
    });

    // Gestisce il click sul link "Leggi"
    $('#wrapper').on('click', '.leggi', function(event) {
        event.preventDefault();
        let fileName = $(this).data('file');

        // Invia la richiesta POST per ottenere i dettagli della notizia
        inviaRichiesta('POST', '/api/dettagli', { file: fileName }).then(function(response) {
            if (!response) return; // Se c'è stato un errore
            // Visualizza la notizia nella sezione #news
            $('#news').text(response.file);

            // Aggiorna il numero di visualizzazioni
            let visSpan = $(event.target).next('.nVis');
            let currentViews = parseInt(visSpan.text().match(/\d+/)[0]);
            visSpan.text(`[visualizzato ${currentViews + 1} volte]`);
        }).catch(function(err) {
            console.error("Errore nel caricamento dei dettagli della notizia: ", err);
        });
    });
});
