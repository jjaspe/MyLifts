import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User} from "../../User/index"
import { Workout, WorkoutService } from '../../Workout/index'
import { NewWorkoutComponent,WorkoutDetailsComponent} from '../../Workout/index'
import { SetService} from '../../Sets/index'
import { Observable} from 'rxjs/Rx'

@Component({
    selector: 'home',
    templateUrl: 'app/App/Home/home.component.html',
    directives: [NewWorkoutComponent,WorkoutDetailsComponent]
})
export class HomeComponent implements OnInit, OnChanges {
    @Input() user:User;
    @Input() userUpdated:boolean;
    currentWorkout:Workout;
    constructor(private workoutService:WorkoutService, private setService:SetService) { }

    ngOnInit() {       
        this.getWorkout();
    }
    
    ngOnChanges(){
    }
    
    getWorkout(){
        let today:Date=new Date();
        if(this.user){
            console.log({User:this.user});
            this.currentWorkout = this.workoutService.getLoggedInUserWorkoutByDate(today);            
        }
    }

}