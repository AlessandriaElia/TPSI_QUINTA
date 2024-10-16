window.onload = function(){

    getCategories();

    async function getCategories(){
        const categories = await inviaRichiesta('GET', '/api/categories');
        if(categories){
            console.log(categories);
        }
    }
}