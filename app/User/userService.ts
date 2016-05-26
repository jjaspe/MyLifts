import { Injectable } from '@angular/core';
import {MockUsers} from './index'

@Injectable()
export class UserService {
    constructor() { }
    
    getUsers(){
        return Promise.resolve(MockUsers);
    }
    
    getUser(index:number){
        return Promise.resolve(MockUsers[index]);
    }

}