import { Injectable } from '@angular/core';
import { MockUsers} from './index' 
import { Observable,Subject}  from 'rxjs/Rx';
import { User} from './User'
import { SessionService} from '../../Session/session.service';
import { HttpService } from '../../Utilities/http.service';

@Injectable()
export class UserService {
    loggedInUser:Subject<User>;
    inMemoryUser:User;
    usersUrl:string="/Users/"
    constructor(private httpService:HttpService,private sessionService:SessionService) { 
        this.loggedInUser=<Subject<User>> new Subject();
    }
    
    initUrls(){
        this.usersUrl=this.sessionService.session.ApiUrl+this.usersUrl;
    }
    
    getUsers(){
        return this.httpService.get(this.usersUrl);
    }
    
    getUserByUsername(username:string){
        let fullUrl=this.usersUrl+username;
        return this.httpService.get(fullUrl);
    }
    
    getUser(index:number){
        return Promise.resolve(MockUsers[index]);
    }
    
    getLoggedInUser(){
        return this.loggedInUser.asObservable();
    }
    
    clearLoggedInUser(){
        this.inMemoryUser=null;
        this.loggedInUser=<Subject<User>> new Subject();
        this.loggedInUser.next(this.inMemoryUser);
    }
    
    setLoggedInUser(username:string){
        this.getUserByUsername(username).subscribe(a=>{
            this.inMemoryUser=a;
            this.loggedInUser.next(this.inMemoryUser);
        });
    }
    
    signInUser(username:string,name:string){
        let fullUrl=this.usersUrl;        
        let user=new User();
        user.UserName=username;
        user.FirstName=username;
        this.httpService.post(fullUrl,user).subscribe(a=>{  
            this.setLoggedInUser(username);
        });
    }
}