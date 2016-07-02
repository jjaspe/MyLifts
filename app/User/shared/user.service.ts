import { Injectable } from '@angular/core';
import { MockUsers} from './index' 
import { Http, Response } from '@angular/http';
import { Observable,Subject}  from 'rxjs/Rx';
import { User} from './User'
import { SessionService} from '../../Session/session.service'

@Injectable()
export class UserService {
    loggedInUser:Subject<User>;
    inMemoryUser:User;
    getUsersUrl:string="/Users"
    getUserByUsernameUrl:string="/Users/GetUser?username=";
    postUserUrl:string="/Users/PostUser?name={0}&username={1}"
    constructor(private http: Http, private sessionService:SessionService) { 
        this.loggedInUser=<Subject<User>> new Subject();
    }
    
    initUrls(){
        this.getUsersUrl=this.sessionService.session.ApiUrl+this.getUsersUrl;
        this.getUserByUsernameUrl=this.sessionService.session.ApiUrl+this.getUserByUsernameUrl;
        this.postUserUrl=this.sessionService.session.ApiUrl+this.postUserUrl;
    }
    
    getUsers(){
        return this.http.get(this.getUsersUrl).map(this.extractUserData).catch(this.handleError);
    }
    
    getUserByUsername(username:string){
        let fullUrl=this.getUserByUsernameUrl+username;
        return this.http.get(fullUrl).map(this.extractUserData).catch(this.handleError);
    }
    
    getUser(index:number){
        return Promise.resolve(MockUsers[index]);
    }
    
    getLoggedInUser(){
        return this.loggedInUser.asObservable();
    }
    
    extractUserData(res:Response){
        let body = res.json();
        return body || { };
    }
    
    clearLoggedInUser(){
        this.inMemoryUser=null;
        this.loggedInUser.next(this.inMemoryUser);
    }
    
    setLoggedInUser(username:string){
        this.getUserByUsername(username).subscribe(a=>{
            if(a){
                this.inMemoryUser=a;
                this.loggedInUser.next(this.inMemoryUser);
            }
        })
    }
    
    signUpUser(username:string,name:string){
        let fullUrl=this.postUserUrl.replace("{0}",name).replace("{1}",name);
        this.http.post(fullUrl,"").map(this.extractUserData).catch(this.handleError).subscribe(a=>{
            if(a){
                this.inMemoryUser=a;
                this.loggedInUser.next(this.inMemoryUser);
            }
        });
    }
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}