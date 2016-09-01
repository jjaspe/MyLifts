import { Component, OnInit, Input } from '@angular/core';
import { WorkoutService,Workout, WorkoutComponent } from '../../Workout/index'
import { Set,SetFormComponent } from '../../Sets/index'
import { User} from '../../User/index'

@Component({
    selector: 'workout-details',
    templateUrl: 'app/Workout/WorkoutDetails/workoutDetails.component.html',
    directives:[SetFormComponent,WorkoutComponent],
    styleUrls:['app/Workout/WorkoutDetails/workoutDetails.component.css']
})
export class WorkoutDetailsComponent implements OnInit {
    @Input() workout:Workout;
    @Input() user:User;
    newSet:Set;
    @Input() state:string;
    
    constructor(private workoutService:WorkoutService) { }

    ngOnInit() { this.newSet=null;}
    
    onAddSetButtonClicked(){
        this.newSet=new Set();
        this.newSet.workoutId=this.workout.Id;
        this.state="add";        
    }
    
    saveWorkoutClicked(){
        this.workoutService.saveWorkout(this.workout);
    }
    
    setAdded(set:Set){
        console.log("set added");
        this.workout=this.workoutService.addSetToWorkout(this.workout,this.newSet);
        this.onAddSetButtonClicked();
        this.workoutService.saveWorkout(this.workout);
    }
}