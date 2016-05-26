import { Component, OnInit, Input } from '@angular/core';
import { Workout, WorkoutComponent } from '../../../Workout/index'
import { ExerciseSelectionComponent} from '../../../ExerciseSelection/index'
import { Set,SetFormComponent } from '../../../Sets/index'
import { Exercise } from '../../../Exercises/index'

@Component({
    selector: 'workout-details',
    templateUrl: 'app/App/Home/WorkoutDetails/workoutDetails.component.html',
    directives:[ExerciseSelectionComponent,SetFormComponent,WorkoutComponent]
})
export class WorkoutDetailsComponent implements OnInit {
    @Input()
    workout:Workout;
    newSet:Set;
    @Input()
    state:string;
    
    constructor() { }

    ngOnInit() { this.newSet=null}
    
    onAddSetButtonClicked(){
        this.newSet=new Set();
        this.state="add";
    }
    
    onExerciseSelected(exercise:Exercise){        
        this.newSet.exercise=exercise;
    }

}