import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

    logErrors:boolean = true;
    constructor() { }

    log(error:string){
        if(this.logErrors)
            console.log(error);
    }
    
    logObject(name:string,object:any){
        var data={};
        data[name]=object
        if(this.logErrors)
            console.log(data);
    }
}