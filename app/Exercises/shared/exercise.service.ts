import { Injectable} from "@angular/core";
import { Observable} from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Exercise } from './Exercise'
import { ExerciseWithBodyParts} from './ExerciseWithBodyParts'
import { SessionService } from '../../Session/index'
import { HttpService } from '../../Utilities/http.service'

@Injectable()
export class ExerciseService{
    exercisesUrl:string="/Exercises";
    exercises:Exercise[]=[];
    
    constructor(private httpService:HttpService,private sessionService:SessionService){}
    
    initUrls(){
        this.exercisesUrl=this.sessionService.session.ApiUrl+this.exercisesUrl;
        this.getExercises().subscribe(n=>this.exercises=n);
    }
    
    getExercises() : Observable<Exercise[]>{
        return this.httpService.get(this.exercisesUrl);
    }
    
    getExercise(id:number){
        return Promise.resolve(this.exercises.filter(n=>n.Id==id)[0]);
    }
    
    saveExercise(exWithBp:ExerciseWithBodyParts):Observable<Response>{
        return this.httpService.post(this.exercisesUrl,exWithBp);
    }
    
    deleteExercise(exercise:Exercise){
        
    }
    
    setDetails(res:Response){
        let body = res.json();
        let exercises=[];
        body.forEach(n=>n.Details=[]);
    }    
}