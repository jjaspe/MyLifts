import {Component,OnInit,OnChanges,Input,SimpleChange, Output, EventEmitter} from "@angular/core"
import {Exercise} from "../shared/index"

@Component({
    selector:'exercise-list',
    templateUrl:"app/Exercises/ExerciseList/exerciseList.component.html",
    styleUrls:["app/Exercises/exercises.component.css"]
})

export class ExerciseListComponent {
    @Input() title:string="Exercises";
    @Output() exerciseSelected=new EventEmitter<Exercise>()
    selectedExercise:Exercise;    
    @Input() exercises:Exercise[];
    
    constructor(){  
    }
    
    onExerciseSelected(exercise:Exercise){
        this.selectedExercise=exercise;
        this.exerciseSelected.emit(exercise);
    }
}