import { Component, OnInit, Input } from '@angular/core';
import { Workout} from '../index'

@Component({
    selector: 'workout-list',
    templateUrl: 'workoutList.component.html'
})
export class WorkoutListComponent implements OnInit {
    @Input()
    workouts:Workout[]=[];
    constructor() { }

    ngOnInit() { }
    
    onSelected(workout:Workout){
        
    }

}