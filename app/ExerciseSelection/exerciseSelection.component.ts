import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BodyPartService,BodyPartsComponent,BodyPart} from '../BodyParts/index'
import {ExerciseService,Exercise,ExercisesComponent} from '../Exercises/index'
import {SetFormComponent} from '../Sets/index'
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {} from 'bootstrapui/common';

@Component({
    selector: 'exercise-selection',
    templateUrl: 'app/ExerciseSelection/exerciseSelection.component.html',
    directives:[BodyPartsComponent,ExercisesComponent,SetFormComponent],
    providers:[BodyPartService, ExerciseService],
    styleUrls:['app/App/app.component.css']
})
export class ExerciseSelectionComponent implements OnInit {    
    selectedExercises:Observable<Exercise[]>;
    bodyparts:BodyPart[];
    selectedBodyPart:BodyPart;
    selectedExercise:Exercise;
    @Output() exerciseSelected= new EventEmitter<Exercise>();
    
    constructor(private exerciseService:ExerciseService, 
        private bodypartService:BodyPartService) { }
    
    ngOnInit(){        
       this.getBodyParts();
       this.selectedBodyPart=this.bodyparts[0];
    }
    
    onBodyPartSelected(bodypart:BodyPart) {
        this.selectedBodyPart=bodypart;
    }
    
    onExerciseSelected(exercise:Exercise){
        this.selectedExercise=exercise;
        this.exerciseSelected.emit(exercise);
    }
    
    getBodyParts(){
        this.bodyparts=this.bodypartService.getBodyParts();
    }
}