import {Component,OnInit,OnChanges,Input,SimpleChange, Output, EventEmitter} from "@angular/core"
import {BodyPart,BodyPartService} from "../BodyParts/index"
import {Exercise} from "../Exercises/index"

@Component({
    selector:'my-exercises',
    templateUrl:"app/Exercises/exercises.component.html",
    styleUrls:["app/Exercises/exercises.component.css"]
})

export class ExercisesComponent implements OnChanges{
    title:string="Exercises";
    @Output() exerciseSelected=new EventEmitter<Exercise>()
    @Input() selectedBodyPart:BodyPart;
    selectedExercise:Exercise;    
    exercises:Exercise[];
    
    constructor(private bodyPartService: BodyPartService){  
    }
    
    ngOnChanges(changes: {[propKey:string]: SimpleChange}){
        for(let prop in changes){
            if(prop=="selectedBodyPart"){
                this.exercises=this.bodyPartService.getExercisesFromBodyPart(this.selectedBodyPart);
                this.selectedExercise = null;
                break;
            }
        }        
    }
    
    onExerciseSelected(exercise:Exercise){
        this.selectedExercise=exercise;
        this.exerciseSelected.emit(exercise);
    }
}