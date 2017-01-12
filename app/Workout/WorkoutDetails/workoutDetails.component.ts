import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WorkoutService, Workout, WorkoutComponent } from '../../Workout/index'
import { Set, SetFormComponent } from '../../Sets/index'
import { User} from '../../User/index'
import { LogService} from '../../Utilities/log.service'

@Component({
    selector: 'workout-details',
    templateUrl: 'app/Workout/WorkoutDetails/workoutDetails.component.html',
    directives: [SetFormComponent, WorkoutComponent],
    styleUrls: ['app/Workout/WorkoutDetails/workoutDetails.component.css']
})
export class WorkoutDetailsComponent implements OnInit, OnChanges {
    @Input() workout: Workout;
    newSet: Set;
    @Input() state: string;

    constructor(private workoutService: WorkoutService, private logService: LogService) { }

    ngOnInit() { this.newSet = null; }

    ngOnChanges() { }

    onAddSetButtonClicked() {
        this.newSet = new Set();
        this.newSet.workoutId = this.workout.Id;
        this.state = "add";
    }

    saveWorkoutClicked() {
        this.workoutService.saveWorkout(this.workout,null);
    }

    setAdded(set: Set) {
        this.onAddSetButtonClicked();
        this.workoutService.addSetToWorkout(this.workout, set, (savedWorkout)=>{
            this.workout=savedWorkout;
        });
    }
}