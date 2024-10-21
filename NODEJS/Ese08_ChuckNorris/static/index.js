window.onload = function () {
    const categoryList = $("#categoryList");
    const mainWrapper = $("#mainWrapper");
    const btnAdd = $("#btnAdd");
    let select;
    getCategories();


    async function getCategories() {
        const categories = await inviaRichiesta('GET', '/api/categories');
        if (categories) {
            console.log(categories);
            select = $('<select>').appendTo(categoryList).on('change', function () {
                let selectedCategory = $(this).val();
                getFacts(selectedCategory);
            });
            categories.forEach(category => {
                $('<option>').text(category).val(category).appendTo(select);
            });
            getFacts(categories[0]);
        }
    }
    async function getFacts(category) {
        const facts = await inviaRichiesta('GET', '/api/facts', { category });
        if (facts) {
            mainWrapper.empty();
            console.log(facts);
            mainWrapper.append($("<h2>").text('rate your favourite facts').css('text-align', 'center'));
            facts.forEach(fact => {

                let input = $('<input>').prop('type', 'checkbox').val(fact['id']);
                let span = $('<span>').text(fact['value']);
                let br = $('<br>');

                mainWrapper.append(input, span, br);
            });
            mainWrapper.append($('<button>').prop('id', 'btnInvia').text('invia').on('click', function () {
                let selectedIds = [];
                $('#mainWrapper input:checked').each(function () {
                    selectedIds.push($(this).val());
                });

                console.log(selectedIds);

                if (selectedIds.length > 0) {
                    const rates = inviaRichiesta('POST', '/api/rate', {ids: selectedIds});
                    if(rates){
                        alert('OK');
                    }
                }
            }));

        }
    }
    btnAdd.on('click', function(){
        aggiungiNotizia();
    })
    async function aggiungiNotizia(){
        let category = select.val();
        let factContent = $('#newFact').val();
        if (!category || !factContent) {
            alert("Seleziona una categoria e inserisci il contenuto.");
            return;
        }
        const newFact = {
            categoria: category,
            value: factContent
        };

        const response = await inviaRichiesta('POST', '/api/add', newFact);
        if(response){
           
            getFacts(category);
        }
    }
}