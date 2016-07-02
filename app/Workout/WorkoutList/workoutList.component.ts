import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Workout, WorkoutComponent, WorkoutService} from '../index'
import { DatePickerComponent} from 'ng2-bootstrap/ng2-bootstrap';
import { User, UserService } from '../../User/index'
import { CustomClass } from './customDateClass'

@Component({
    selector: 'workout-list',
    templateUrl: 'app/Workout/WorkoutList/workoutList.component.html',
    directives: [DatePickerComponent, WorkoutComponent],
    styleUrls: ["app/Workout/WorkoutList/workoutList.component.css"]
})


export class WorkoutListComponent implements OnInit {
    @Input() selectedDate: Date = new Date();
    @Input() selectedWorkout: Workout
    customClass: CustomClass[] = []
    disabledDates: Array<{ date: Date, mode: string }> = []
    workouts: Workout[] = [];
    user: User;

    constructor(private workoutService: WorkoutService, private userService: UserService) {
        this.user=this.userService.inMemoryUser;
        this.userService.getLoggedInUser().subscribe(a => {
            this.user = a;
        });
        this.workoutService.getWorkouts().subscribe(n => this.setCustomClassesForWorkouts(n));
        this.onDateChangedEvent(this.selectedDate);
    }

    ngOnInit() { }

    setCustomClassesForWorkouts(workouts: Workout[]) {
        this.workouts = workouts;
        workouts.forEach(n => {
            this.customClass.push({
                date: this.flattenDate(n.WorkoutDate), mode: "day",
                clazz: "has-workout"
            });
            this.disabledDates.push({ date: this.flattenDate(n.WorkoutDate), mode: "day" });
        })
    }

    flattenDate(date: Date) {
        date = new Date(date.toString());
        date.setHours(0, 0, 0, 0);
        return date;
    }
    onDateChangedEvent(date: any) {
        setTimeout(() => {
            this.workoutService.getWorkoutByDate(this.user, this.selectedDate).subscribe(w => {
                this.selectedWorkout = w;
            })
        }, 10);
    }

}