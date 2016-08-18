import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BodyPartService, BodyPartsComponent, BodyPart} from '../../BodyParts/index'
import { ExerciseService, Exercise} from '../shared/index'
import { ExercisesComponent } from '../exercises.component'
import { ExerciseListComponent } from '../ExerciseList/exerciseList.component'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {} from 'bootstrapui/common';

@Component({
    selector: 'exercise-selection',
    templateUrl: 'app/Exercises/ExerciseSelection/exerciseSelection.component.html',
    directives: [BodyPartsComponent, ExercisesComponent, ExerciseListComponent],
    styleUrls: ['app/App/app.component.css']
})
export class ExerciseSelectionComponent implements OnInit {
    selectedExercises: Observable<Exercise[]>;
    bodyparts: BodyPart[] = [];
    exercisesShown: Exercise[] = [];
    selectedBodyPart: BodyPart;
    selectedExercise: Exercise;
    @Output() exerciseSelected = new EventEmitter<Exercise>();
    @Output() bodyPartSelected = new EventEmitter<BodyPart>();

    constructor(private exerciseService: ExerciseService,
        private bodypartService: BodyPartService) { }

    ngOnInit() {
        this.getBodyParts();
    }

    onBodyPartSelected(bodypart: BodyPart) {
        this.selectedBodyPart = this.bodyparts.filter(n => n.Id == bodypart.Id)[0];
        this.bodyPartSelected.emit(this.selectedBodyPart);
        this.exercisesShown = this.selectedBodyPart.exercises;
        if (bodypart.exercises[0])
            this.onExerciseSelected(this.selectedBodyPart.exercises[0]);
    }

    onExerciseSelected(exercise: Exercise) {
        this.selectedExercise = exercise;
        this.exerciseSelected.emit(exercise);
    }

    setBodyParts(bodyParts: BodyPart[]) {
        this.bodyparts = bodyParts;
        if (this.bodyparts[0])
            this.onBodyPartSelected(this.bodyparts[0]);
    }

    getBodyParts() {
        this.bodypartService.getBodyParts().subscribe(n => this.setBodyParts(n));
    }
}