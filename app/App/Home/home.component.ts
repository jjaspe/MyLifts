import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User} from "../../User/index"
import { Workout, WorkoutService } from '../../Workout/index'
import { NewWorkoutComponent,WorkoutDetailsComponent} from '../../Workout/index'
import { SetService} from '../../Sets/index'

@Component({
    selector: 'home',
    templateUrl: 'app/App/Home/home.component.html',
    directives: [NewWorkoutComponent,WorkoutDetailsComponent]
})
export class HomeComponent implements OnInit, OnChanges {
    @Input() user:User;
    currentWorkout:Workout;
    constructor(private workoutService:WorkoutService, private setService:SetService) { }

    ngOnInit() {       
        this.getWorkout();
    }
    
    ngOnChanges(){
        this.getWorkout();
    }
    
    getWorkout(){
        let today:Date=new Date();
        if(this.user){
            this.currentWorkout = this.workoutService.getLoggedInUserWorkoutByDate(today);
        }
    }

}