import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User} from "../../User/index"
import { Workout, WorkoutService } from '../../Workout/index'
import { NewWorkoutComponent,WorkoutDetailsComponent} from './index'

@Component({
    selector: 'home',
    templateUrl: 'app/App/Home/home.component.html',
    directives: [NewWorkoutComponent,WorkoutDetailsComponent],
    providers: [WorkoutService]
})
export class HomeComponent implements OnInit, OnChanges {
    @Input()
    user:User;
    currentWorkout:Workout;
    constructor(private workoutService:WorkoutService) { }

    ngOnInit() { 
        if(this.user){
            this.workoutService.getWorkoutByDate(this.user,new Date()).then(workout=>{
                    this.currentWorkout=workout
                })
        }
    }
    
    ngOnChanges(){
        if(this.user){
            this.workoutService.getWorkoutByDate(this.user,new Date()).then(workout=>{
                    this.currentWorkout=workout
                })
        }
    }

}