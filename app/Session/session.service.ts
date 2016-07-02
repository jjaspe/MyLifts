import { Session } from "./Session"
import { Injectable } from "@angular/core"

@Injectable()
export class SessionService{
    session:Session=new Session();
    
    constructor(){
        
    }
}