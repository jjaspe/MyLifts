import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BodyPartsComponent, BodyPartService, BodyPart } from '../../BodyParts/index';
import { Exercise, ExerciseWithBodyParts, ExerciseService } from '../shared/index';

@Component({
    selector: 'exercise-creation',
    templateUrl: 'app/Exercises/ExerciseCreation/exerciseCreation.component.html',
    styleUrls: ['app/Exercises/ExerciseCreation/exerciseCreation.component.css'],
    directives: [ BodyPartsComponent ]
})
export class ExerciseCreationComponent implements OnInit {
    bodyparts:BodyPart[];
    newExercise:Exercise;
    chosenBodyParts:BodyPart[]=[];
    @Output() exerciseCreated=new EventEmitter<ExerciseWithBodyParts>();
    
    constructor(private bodyPartService:BodyPartService,
                private exerciseService:ExerciseService) { 
        this.newExercise=new Exercise();
    }

    ngOnInit() { 
        this.bodyPartService.getBodyParts().subscribe(n=>this.bodyparts=n);
    }
    
    onBodyPartClicked(bodypart:BodyPart){
        let index=this.chosenBodyParts.indexOf(bodypart);
        if(index>-1){
            this.chosenBodyParts.splice(index,1);
        }
        else{
            this.chosenBodyParts.push(bodypart);
        }
    }
    
    removeBodyPart(bodypart:BodyPart){
        let index=this.chosenBodyParts.indexOf(bodypart);
        if(index>-1){
            this.chosenBodyParts.splice(index,1);
        }
    }
    
    submit(){
        if(this.chosenBodyParts[0] && this.newExercise.Name){
            let exWithBp=new ExerciseWithBodyParts();
            exWithBp.bodyparts=this.chosenBodyParts;
            exWithBp.Name=this.newExercise.Name;
            exWithBp.Id=this.newExercise.Id;
            this.exerciseService.saveExercise(exWithBp);
            this.exerciseCreated.emit(exWithBp)
        }
    }

}