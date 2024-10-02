import fs from 'fs';
import { isInterfaceDeclaration } from 'typescript';
let paginaVuota: string;

class Dispatcher{
    prompt: string = '>>> ';
    listeners: Object = {
        GET:{},
        POST:{},
        PUT:{},
        PATCH:{},
        DELETE:{}
    }
    constructor(){
        init();
    }
    function init(){
        fs.readFile('static/error.html', function(err,data){
            if(!err){
                paginaVuota = data.toString();
            }
            else{
                paginaErrore = '<h2>Risorsa non trovata </h2>';
            }
        })
    }
}