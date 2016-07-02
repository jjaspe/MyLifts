import { Workout } from "./Workout"
import { Set, SetGroup} from "../Sets/index"
import { SetService } from "../Sets/shared/index"
import { Exercise } from "../Exercises/index"
import { User} from "../User/index"
import { Injectable,OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from "rxjs/Rx";
import { SessionService } from '../Session/session.service'

@Injectable()
export class WorkoutService {
    getWorkoutsUrl:string="/Workouts";
    getWorkoutsByUserUrl:string = "/Workouts/GetWorkoutsByUser";
    postWorkoutUrl:string="/Workouts/Post";
    workouts:Workout[]=[];
    user:User;
    constructor(private http: Http, private setService:SetService,private sessionService:SessionService) { 
    }    
    
    initUrls(){
        this.getWorkoutsUrl = this.sessionService.session.ApiUrl+this.getWorkoutsUrl;
        this.getWorkoutsByUserUrl = this.sessionService.session.ApiUrl+this.getWorkoutsByUserUrl;
        this.postWorkoutUrl = this.sessionService.session.ApiUrl + this.postWorkoutUrl;
    }
    
    fixWorkoutDates(){
        this.workouts.forEach(el => {
            el.WorkoutDate=new Date(el.WorkoutDate.toString());
        });
    }
    
    fetchWorkouts(){
        this.getWorkoutsFromAPI().subscribe(n=>
            {
                this.workouts=n;
                this.fixWorkoutDates();
            });
    }
    
    getWorkoutsFromAPI() : Observable<Workout[]>{
        return  this.http.get(this.getWorkoutsUrl).map(this.extractWorkoutData.bind(this)).catch(this.handleError);
    }
    
    getWorkouts():Observable<Workout[]>{
        return  Observable.of(this.workouts);
    }
    
    extractWorkoutData(res:Response){
        let body = res.json();
        return body || { };
    }
    
    getWorkoutByDate(user:User,date:Date){
        date= date || new Date();        
        if(user){
            let userWorkouts=this.workouts.filter(a=>a.UserId===user.Id);
            if(userWorkouts){
                let workout=userWorkouts.filter(m=>this.compareDates(m.WorkoutDate,date))[0]
                if(workout && (!workout.setGroups || workout.setGroups.length==0)){
                    this.setService.getSetsByWorkout(workout).subscribe(n=>workout.setGroups=this.setService.getSetGroups(n));
                }
                return Observable.of(workout)
            }            
            else
                return Observable.of(null);
        }else{
            return Observable.of(null);
        }
        
    }
    
    compareDates(date1:Date,date2:Date){
        if(date1===null || date2===null)
            return  false;
        date1=this.flattenDate(date1);
        date2=this.flattenDate(date2);
        return date1.getFullYear===date2.getFullYear && date1.getMonth()===date2.getMonth() && 
            date1.getDate()===date2.getDate();
    }
    
    flattenDate(date:Date){
        date=new Date(date.toString());
        date.setHours(0,0,0,0);
        return date;
    }
    
    getLastSetOfExercise(user:User,exercise:Exercise){
        let sortedWorkouts=this.getExerciseHistory(user.Workouts,exercise).
            sort( (a,b)=>b.WorkoutDate.getUTCDate()-a.WorkoutDate.getUTCDate() );
            
        if(sortedWorkouts[0]){
            let lastOne:Workout = sortedWorkouts[0]
            //Find setGroup with exercise, then find last set
            return lastOne.setGroups.filter(n=>
                n.exercise.Name==exercise.Name)[0].
                    Sets.sort((a,b)=>b.Number-a.Number)[0];
        }
        else
            return null;
        
    }
    
    saveWorkout(workout:Workout){
        let body=JSON.stringify(workout);
        let headers= new Headers({ 'Content-Type': 'application/json' });
        let options= new RequestOptions({headers:headers}); 
        this.http.post(this.postWorkoutUrl,body,options)
                .map((res:Response)=>console.log(res))
                .catch(this.handleError).subscribe(a=>{});
        this.fetchWorkouts();
    }
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("Error:"+errMsg);
        return Observable.throw(errMsg);
    }
    
    getExerciseHistory(workouts:Workout[], exercise:Exercise){
        let workoutsWithExercise = workouts.filter(n=>
            n.setGroups.some(m=>m.exercise.Name==exercise.Name));
        return workoutsWithExercise;
    }
    
    addSetToWorkout(workout:Workout,set:Set){
        if(!workout.setGroups){
            workout.setGroups=[]
        }
        if(workout.setGroups){
            let group=workout.setGroups.filter(n=>n.exercise.Name==set.exercise.Name)[0];
            if(group){
                set.Number=group.Sets.length+1;
                group.Sets.push(set);
            }else{
                set.Number=1;
                workout.setGroups.push({exercise:set.exercise,Sets:[set]});
            }
        }
        
        return  workout;
    }

}