import { Workout } from "./Workout"
import { Set, SetGroup} from "../../Sets/index"
import { SetService } from "../../Sets/shared/index"
import { Exercise } from "../../Exercises/index"
import { User} from "../../User/index"
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from "rxjs/Rx";
import { SessionService } from '../../Session/session.service'
import { HttpService } from '../../Utilities/http.service'
import { LogService } from '../../Utilities/log.service'
import { UserService } from '../../User/shared/user.service'

@Injectable()
export class WorkoutService implements OnInit{
    workoutsUrl: string = "/Workouts/";
    getWorkoutsByUserUrl: string = "/Workouts/GetWorkoutsByUser";
    workouts: Workout[] = [];
    user: User;
    constructor(private httpService: HttpService, private setService: SetService, private sessionService: SessionService, 
        private logService: LogService, private userService:UserService) {
            
    }

    ngOnInit(){
        this.user = new User();
        this.userService.getLoggedInUser().subscribe( user=> {
            console.log({UserUpdatedInWorkoutService:user});
            this.user=user
        });    
    }
    
    initUrls() {
        this.workoutsUrl = this.sessionService.session.ApiUrl + this.workoutsUrl;
        this.getWorkoutsByUserUrl = this.sessionService.session.ApiUrl + this.getWorkoutsByUserUrl;
    }

    fixWorkoutDates() {
        this.workouts.forEach(el => {
            el = this.fixWorkoutDate(el);
        });
    }

    fixWorkoutDate(workout: Workout) {
        workout.workoutDate = workout.workoutDate ? new Date(workout.workoutDate.toString()) : new Date();
        return workout;
    }

    fetchWorkouts() {
        this.getWorkoutsFromAPI().subscribe(n => {
            this.workouts = n;
            this.fixWorkoutDates();
        });
    }

    getWorkoutsFromAPI(): Observable<Workout[]> {
        return this.httpService.get(this.workoutsUrl);
    }

    getWorkouts(): Observable<Workout[]> {
        return Observable.of(this.workouts);
    }

    getWorkoutByDate(user: User, date: Date) {
        date = date || new Date();
        if (user) {
            let userWorkouts = this.workouts.filter(a => a.userId === user.Id);
            let workout = this.filterWorkoutByDate(userWorkouts, date);
            return Observable.of(workout);
        } else {
            return Observable.of(null);
        }
    }

    filterWorkoutByDate(workouts: Workout[], date: Date): Workout {
        if (workouts && workouts.length > 0) {
            let workout = workouts.find(m => this.compareDates(m.workoutDate, date));
            
            return workout;
        }
        else
            return null;
    }

   /*getLoggedInUserWorkoutByDate(date: Date) {
        let workout = null;
        if(this.user && this.user.Workouts)
            workout = this.filterWorkoutByDate(this.user.Workouts?this.user.Workouts:[], date);
        return workout;
    }*/
    
    getLoggedInUserWorkoutByDate(date: Date,user?:User ){
        
    }

    updateUser() {
        //this.user = this.userService.inMemoryUser;
    }

    getWorkoutsByUser(user: User): Observable<any> {
        let fullUrl = this.getWorkoutsByUserUrl + "/" + user.Id;
        let ws = [];
        return this.httpService.get(fullUrl).map(this.mapWorkouts.bind(this));
    }

    mapWorkouts(workouts: Workout[]): Workout[] {
        workouts.forEach(w => this.mapWorkout.bind(this)(w));
        return workouts;
    }

    mapWorkout(workout: Workout) {
        workout = this.fixWorkoutDate(workout);
        return workout;
    }

    compareDates(date1: Date, date2: Date) {
        if (date1 === null || date2 === null)
            return false;
        date1 = this.flattenDate(date1);
        date2 = this.flattenDate(date2);
        var result = date1.getFullYear === date2.getFullYear && date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
        return result;
    }

    flattenDate(date: Date) {
        date = new Date(date.toString());
        date.setHours(0, 0, 0, 0);
        return date;
    }

    getLastSetOfExercise(user: User, exercise: Exercise) {
        let sortedWorkouts = this.getExerciseHistory(user.Workouts, exercise).
            sort((a, b) => b.workoutDate.getUTCDate() - a.workoutDate.getUTCDate());
        if (sortedWorkouts && sortedWorkouts[0]) {
            let lastWorkout: Workout = sortedWorkouts[0];
            //From last workout, find setGroup with exercise, then find last set
            let lastSet = lastWorkout.setGroups.find(n =>
                n.exercise.Name == exercise.Name).
                sets.sort((a, b) => b.number - a.number)[0];
            return lastSet;
        }
        else
            return null;
    }

    getExerciseHistory(workouts: Workout[], exercise: Exercise) {
        let workoutsWithExercise = workouts.filter(n =>
            n.setGroups.some(m => m.exercise.Name == exercise.Name));
        return workoutsWithExercise;
    }
    
    private postWorkout(workout:Workout):Observable<any>{
        this.logService.log("workoutposted");
        return this.httpService.post(this.workoutsUrl, workout).map(a=>a.json());
    }

    saveWorkout(workout: Workout,callback:any){
        this.logService.log("saveWorkout called");
        this.postWorkout(workout).subscribe(savedWorkout => {
            this.logService.logObject("SavedWorkoutAfterCallbcak",savedWorkout);
            this.getWorkoutsByUser(this.user).subscribe( (workouts) => {
                console.log({NewWorkouts:workouts});
                this.user.Workouts=workouts;
                this.workouts=workouts;
            }); 
            this.logService.logObject("savedWorkout",savedWorkout);
            this.updateExistingWorkout(workout,savedWorkout,callback);
            
        });
        
    }
    
    private updateExistingWorkout(workout:Workout,newWorkout:Workout,callback:any){
        let existingWorkout:Workout = this.user.Workouts.find(w=>w.Id==workout.Id);
        this.logService.logObject("workout before updating",workout);
        this.fixWorkoutDate(newWorkout);
        if(!existingWorkout){
            this.user.Workouts.push(newWorkout);
        }            
        else{            
            existingWorkout=newWorkout;
        }        
        workout=null;
        workout=newWorkout;
        this.logService.logObject("workout after updating",workout);
        if(callback)
            callback(workout);
    }

    addSetToWorkout(workout: Workout, set: Set,callback:any) {
        this.updateSetGroups(workout,set);
        this.postWorkout(workout).subscribe( savedWorkout=>{
            this.logService.logObject("savedWorkout",savedWorkout);
            this.updateExistingWorkout(workout,savedWorkout,callback); 
        });
    }    
       
    updateSetGroups(workout:Workout, set:Set){
        if (!workout.setGroups) {
            workout.setGroups = []
        }
        let group = workout.setGroups.find(n => n.exercise.Name == set.exercise.Name);
        if (group) {
            set.number = group.sets.length + 1;
            group.sets.push(set);
        } else {
            set.number = 1;
            workout.setGroups.push({ exercise: set.exercise, sets: [set] });
        }
    }
    
    removeSetFromWorkout(workout:Workout, set:Set,callback){            
        workout.setGroups.some(sg=>{
            let removed:boolean = this.removeSetFromSetGroup(set,sg);
            if(sg.sets.length==0)
                this.removeSetGroupFromWorkout(sg,workout);
            return removed;
        });
        this.saveWorkout(workout,callback);
    }
    
    removeSetFromSetGroup(set:Set,setGroup:SetGroup):boolean{        
        let setIndex=setGroup.sets.indexOf(set);
        if(setIndex>-1){
            setGroup.sets.splice(setIndex,1);
            this.renumberSetsInSetGroup(setGroup);
            return true;
        }        
        else
            return false;      
    }
    
    renumberSetsInSetGroup(setGroup:SetGroup){
        setGroup.sets.forEach( (set,index)=>{
            set.number=index+1;
        })
    }
    
    removeSetGroupFromWorkout(setGroup:SetGroup, workout:Workout):boolean{
        let setGroupIndex=workout.setGroups.indexOf(setGroup);
        if(setGroupIndex>-1){
            workout.setGroups.splice(setGroupIndex,1);
            return true;
        }
        else
            return false;
            
    }

}