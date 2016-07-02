import { Component, OnInit, Input } from '@angular/core';
import { Workout} from './index'
import { Set, SetComponent, SetListComponent } from "../Sets/index"

@Component({
    selector: 'workout',
    templateUrl: 'app/Workout/workout.component.html',
    directives:[SetListComponent]
})
export class WorkoutComponent implements OnInit {
    @Input() workout:Workout;
    constructor() { }

    ngOnInit() { }
}