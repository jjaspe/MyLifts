import { Workout } from "./Workout"
import { Set, SetGroup} from "../../Sets/index"
import { SetService } from "../../Sets/shared/index"
import { Exercise } from "../../Exercises/index"
import { User} from "../../User/index"
import { Injectable,OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from "rxjs/Rx";
import { SessionService } from '../../Session/session.service'
import { HttpService } from '../../Utilities/http.service'

@Injectable()
export class WorkoutService {
    getWorkoutsUrl:string="/Workouts/";
    getWorkoutsByUserUrl:string = "/Workouts/GetWorkoutsByUser";
    workouts:Workout[]=[];
    user:User;
    constructor(private httpService: HttpService, private setService:SetService,private sessionService:SessionService) { 
    }    
    
    initUrls(){
        this.getWorkoutsUrl = this.sessionService.session.ApiUrl+this.getWorkoutsUrl;
        this.getWorkoutsByUserUrl = this.sessionService.session.ApiUrl+this.getWorkoutsByUserUrl;
    }
    
    fixWorkoutDates(){
        this.workouts.forEach(el => {
            el = this.fixWorkoutDate(el);
        });
    }
    
    fixWorkoutDate(workout:Workout){
        workout.workoutDate=workout.workoutDate?new Date(workout.workoutDate.toString()):new Date();
        return workout;
    }
    
    fetchWorkouts(){
        this.getWorkoutsFromAPI().subscribe(n=>
            {
                this.workouts=n;
                this.fixWorkoutDates();
            });
    }
    
    getWorkoutsFromAPI() : Observable<Workout[]>{
        return this.httpService.get(this.getWorkoutsUrl);
    }
    
    getWorkouts():Observable<Workout[]>{
        return  Observable.of(this.workouts);
    }
    
    getWorkoutByDate(user:User,date:Date){
        date= date || new Date();        
        if(user){
            let userWorkouts=this.workouts.filter(a=>a.userId===user.Id);
            let workout=this.filterWorkoutByDate(userWorkouts,date);
            return Observable.of(workout);
        }else{
            return Observable.of(null);
        }
    }
    
    filterWorkoutByDate(workouts:Workout[],date:Date):Workout{
        if(workouts && workouts.length>0){
            let workout=workouts.find(m=>this.compareDates(m.workoutDate,date));
            if(workout && workout.sets && workout.sets.length>0 && 
                (!workout.setGroups || workout.setGroups.length==0)){
                    workout.setGroups=this.setService.getSetGroups(workout.sets);
            }
            return workout;
        }            
        else
            return null;
    }
    
    getLoggedInUserWorkoutByDate(date:Date){
        let workout=this.filterWorkoutByDate(this.user.Workouts,date);
        return workout;
    }
    
    setUser(user:User){
        this.user=user;
        this.getWorkoutsByUser(this.user);
    }
    
    getWorkoutsByUser(user:User):Observable<Workout[]>{
        let fullUrl=this.getWorkoutsByUserUrl+"/"+user.Id;
        let ws=[];
        this.httpService.get(fullUrl).subscribe( ws =>{            
            ws.map( w=>this.mapWorkout(w));
            user.Workouts=ws;
        });
        return Observable.of(ws);
    }
    
    mapWorkout(workout:Workout){
        workout=this.fixWorkoutDate(workout);
        workout.setGroups = this.setService.getSetGroups(workout.sets);
        return workout;
    }
    
    compareDates(date1:Date,date2:Date){        
        if(date1===null || date2===null)
            return  false;
        date1=this.flattenDate(date1);
        date2=this.flattenDate(date2);
        var result = date1.getFullYear===date2.getFullYear && date1.getMonth()===date2.getMonth() && 
            date1.getDate()===date2.getDate();
        return result;
    }
    
    flattenDate(date:Date){
        date=new Date(date.toString());
        date.setHours(0,0,0,0);
        return date;
    }
    
    getLastSetOfExercise(user:User,exercise:Exercise){
        let sortedWorkouts=this.getExerciseHistory(user.Workouts,exercise).
            sort( (a,b)=>b.workoutDate.getUTCDate()-a.workoutDate.getUTCDate() );
        if(sortedWorkouts && sortedWorkouts[0]){
            let lastWorkout:Workout = sortedWorkouts[0];
            //From last workout, find setGroup with exercise, then find last set
            let lastSet=lastWorkout.setGroups.find(n=>
                n.exercise.Name==exercise.Name).
                    Sets.sort((a,b)=>b.number-a.number)[0];
            console.log({a:lastSet});
            return lastSet;
        }
        else
            return null;        
    }
    
    saveWorkout(workout:Workout){
        this.httpService.post(this.getWorkoutsUrl,workout).subscribe(
            a=>this.fetchWorkouts()
        );
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
        
        let group=workout.setGroups.find(n=>n.exercise.Name==set.exercise.Name);
        if(group){
            set.number=group.Sets.length+1;
            group.Sets.push(set);
        }else{
            set.number=1;
            workout.setGroups.push({exercise:set.exercise,Sets:[set]});
        }  
        return  workout;
    }

}