import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { Workout,WorkoutComponent, WorkoutService} from '../../Workout/index'
import { User} from '../../User/index'
import { WorkoutDetailsComponent } from '../WorkoutDetails/workoutDetails.component'

@Component({
    selector: 'new-workout',
    templateUrl: 'app/Workout/NewWorkout/newWorkout.component.html',
    directives: [WorkoutComponent,WorkoutDetailsComponent]
})

export class NewWorkoutComponent implements OnInit {
    @Input() user:User;
    workout:Workout;
    @Output() newWorkoutButtonClicked=new EventEmitter<any>()
    @Output() addSetButtonClicked=new EventEmitter<any>()
    constructor(private workoutService:WorkoutService) { }

    ngOnInit() { }
    
    onNewWorkoutButtonClicked(){ 
        this.workout= new Workout();       
        this.workout.userId=this.user.Id;
        this.workout.workoutDate = new Date();
        this.workoutService.saveWorkout(this.workout);
        this.newWorkoutButtonClicked.emit(null);
    }
}