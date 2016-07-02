import { Injectable} from "@angular/core";
import { Observable} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Exercise } from './Exercise'
import { ExerciseWithBodyParts} from './ExerciseWithBodyParts'
import { SessionService } from '../../Session/index'

@Injectable()
export class ExerciseService{
    getExercisesUrl:string="/Exercises";
    postExerciseUrl:string="/Exercises/Post"
    exercises:Exercise[]=[]
    
    constructor(private http: Http,private sessionService:SessionService){}
    
    initUrls(){
        this.getExercisesUrl=this.sessionService.session.ApiUrl+this.getExercisesUrl;
        this.postExerciseUrl=this.sessionService.session.ApiUrl+this.postExerciseUrl;
        this.getExercises().subscribe(n=>this.exercises=n);
    }
    getExercises() : Observable<Exercise[]>{
        return this.http.get(this.getExercisesUrl).map(this.extractExerciseData).catch(this.handleError);
    }
    
    getExercise(id:number){
        return Promise.resolve(this.exercises.filter(n=>n.Id==id)[0]);
    }
    
    saveExercise(exWithBp:ExerciseWithBodyParts){
        let body=JSON.stringify(exWithBp);
        let headers= new Headers({ 'Content-Type': 'application/json' });
        let options= new RequestOptions({headers:headers}); 
        this.http.post(this.postExerciseUrl,body,options)
                .map((res:Response)=>console.log(res))
                .catch(this.handleError).subscribe(r=>{});
    }
    
    private extractExerciseData(res: Response) {
        let body = res.json();
        let exercises=[];
        body.forEach(n=>n.Details=[]);
        return body || { };
    }
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("Error:"+errMsg);
        return Observable.throw(errMsg);
    }
    
}