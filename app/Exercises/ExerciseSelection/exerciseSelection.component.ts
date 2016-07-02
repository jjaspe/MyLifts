import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BodyPartService,BodyPartsComponent,BodyPart} from '../../BodyParts/index'
import { ExerciseService,Exercise} from '../shared/index'
import { ExercisesComponent } from '../exercises.component'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {} from 'bootstrapui/common';

@Component({
    selector: 'exercise-selection',
    templateUrl: 'app/Exercises/ExerciseSelection/exerciseSelection.component.html',
    directives:[BodyPartsComponent,ExercisesComponent],
    styleUrls:['app/App/app.component.css']
})
export class ExerciseSelectionComponent implements OnInit {    
    selectedExercises:Observable<Exercise[]>;
    bodyparts:BodyPart[]=[];
    selectedBodyPart:BodyPart;
    selectedExercise:Exercise;
    @Output() exerciseSelected= new EventEmitter<Exercise>();
    @Output() bodyPartSelected= new EventEmitter<BodyPart>();
    
    constructor(private exerciseService:ExerciseService, 
        private bodypartService:BodyPartService) { }
    
    ngOnInit(){        
       this.getBodyParts();
       
    }
    
    onBodyPartSelected(bodypart:BodyPart) {
        this.selectedBodyPart=bodypart;
        this.bodyPartSelected.emit(bodypart);
        if(bodypart.Exercises[0])
            this.onExerciseSelected(bodypart.Exercises[0]);
    }
    
    onExerciseSelected(exercise:Exercise){
        this.selectedExercise=exercise;
        this.exerciseSelected.emit(exercise);
    }
    
    setBodyParts(bodyParts:BodyPart[]){
        this.bodyparts=bodyParts;
        if(this.bodyparts[0])
            this.onBodyPartSelected(this.bodyparts[0]);
    }
    
    getBodyParts(){
        this.bodypartService.getBodyParts().subscribe(n=>this.setBodyParts(n));
    }
}