import fs from 'fs';
import url from 'url';

class Dispatcher{
    private paginaErrore: string;
    private prompt: string = '>>> ';
    listeners: Object = {
        GET:{},
        POST:{},
        PUT:{},
        PATCH:{},
        DELETE:{}
    }
    constructor(){
        this.init();
    }
    addListener(method:string,resource:string, callback:Function)
    {
        if(!method||!resource||!callback){
            return;
        }
        method = method.toUpperCase();
        if(method in this.listeners){
            this.listeners[method][resource]=callback;
        }
        else{
            throw new Error('Invalid HTTP method');
        }
    }
    public dispatch(req:any, res:any){
        let method = req.method.toUpperCase();
        let fullPath = url.parse(req.url, true);
        let resource = fullPath.pathname;
        let params = fullPath.query;

        console.log(`${this.prompt}${method}: ${resource}, params:${params}`);

        if(!resource?.startsWith('/api/')){
            
        }
    }
    private init(){
        fs.readFile('static/error.html', function(err,data){
            if(!err){
               this.paginaErrore = data.toString();
            }
            else{
                this.paginaErrore = '<h2>Risorsa non trovata </h2>';
            }
        })
}
}
export default new Dispatcher();