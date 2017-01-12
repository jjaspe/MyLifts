import { Component, OnInit, Input } from '@angular/core';
import { Workout, WorkoutService} from './shared/index'
import { Set, SetGroupListComponent, SetService } from "../Sets/index"

@Component({
    selector: 'workout',
    templateUrl: 'app/Workout/workout.component.html',
    directives: [SetGroupListComponent]
})
export class WorkoutComponent implements OnInit {
    @Input() workout: Workout;
    selectedSet: Set;
    constructor(private setService: SetService, private workoutService: WorkoutService) { }

    ngOnInit() { }

    setSelected(set: Set) {
        this.selectedSet = set;
    }

    deleteSet() {
        this.workoutService.removeSetFromWorkout(this.workout, this.selectedSet, (savedWorkout) => {
            this.workout = savedWorkout;
            this.selectedSet=null;
        });

    }

}