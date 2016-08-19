import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable} from "rxjs/Rx";
import { BodyPartsComponent, BodyPartService, BodyPart } from '../../BodyParts/index';
import { Exercise, ExerciseWithBodyParts, ExerciseService } from '../shared/index';
import { ExerciseListComponent} from '../ExerciseList/exerciseList.component'

@Component({
    selector: 'exercise-creation',
    templateUrl: 'app/Exercises/ExerciseCreation/exerciseCreation.component.html',
    styleUrls: ['app/Exercises/ExerciseCreation/exerciseCreation.component.css'],
    directives: [ BodyPartsComponent,ExerciseListComponent ]
})
export class ExerciseCreationComponent implements OnInit {
    bodyparts:BodyPart[];
    newExercise:Exercise;
    chosenBodyParts:BodyPart[]=[];
    selectedExercise:Exercise;
    exercises:Exercise[];
    @Output() exerciseCreated=new EventEmitter<ExerciseWithBodyParts>();
    
    constructor(private bodyPartService:BodyPartService,
                private exerciseService:ExerciseService) { 
        this.newExercise=new Exercise();
    }

    ngOnInit() { 
        this.bodyPartService.getBodyParts().subscribe(n=>this.bodyparts=n);
        this.exerciseService.getExercises().subscribe(n=>{
            this.exercises=n;
        });
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
    
    onExerciseSelected(exercise:Exercise){
        this.selectedExercise = exercise;   
    }
    
    deleteExercise(){
        this.exerciseService.deleteExercise(this.selectedExercise);
    }
    
    submit(){
        if(this.chosenBodyParts[0] && this.newExercise.Name){
            let exWithBp=new ExerciseWithBodyParts();
            exWithBp.bodyparts=this.chosenBodyParts;
            exWithBp.Name=this.newExercise.Name;
            exWithBp.Id=this.newExercise.Id;
            this.exerciseService.saveExercise(exWithBp).subscribe(n=>
                this.exerciseService.getExercises().subscribe(n=>this.exercises=n)
            );
            this.exerciseCreated.emit(exWithBp)
        }
    }

}