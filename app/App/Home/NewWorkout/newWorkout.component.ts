import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { Workout,WorkoutComponent} from '../../../Workout/index'

@Component({
    selector: 'new-workout',
    templateUrl: 'app/App/Home/NewWorkout/newWorkout.component.html',
    directives: [WorkoutComponent]
})

export class NewWorkoutComponent implements OnInit {
    @Input()
    workout:Workout;
    @Output()
    newWorkoutButtonClicked=new EventEmitter<any>()
    @Output()
    addSetButtonClicked=new EventEmitter<any>()
    constructor() { }

    ngOnInit() { 
    }
    onNewWorkoutButtonClicked(){
        this.newWorkoutButtonClicked.emit(null);
    }
}