import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Set, DetailComponent} from '../index'
import { ExerciseSelectionComponent,Exercise } from '../../Exercises/index'
import { BodyPart } from '../../BodyParts/index'
import { WorkoutService} from '../../Workout/index'
import { User } from '../../User/index'

@Component({
    selector: 'set-form',
    templateUrl: 'app/Sets/SetForm/setForm.component.html',
    directives: [DetailComponent,ExerciseSelectionComponent],
    styleUrls: ['app/App/app.component.css','app/Sets/SetForm/setForm.component.css']
})
export class SetFormComponent implements OnInit {
    @Output() setAdded=new EventEmitter<Set>();
    @Input() set:Set;
    @Input() user:User;
    constructor( private workoutService:WorkoutService) { }

    ngOnInit() { }
    
    onExerciseSelected(exercise:Exercise){
        if(this.set){
            let lastSimilarSet:Set=this.workoutService.getLastSetOfExercise(this.user,exercise);
            this.set.exercise=exercise;
            if(lastSimilarSet){
                this.set.weight = lastSimilarSet.weight;
                this.set.reps = lastSimilarSet.reps;
                this.set.number = lastSimilarSet.number+1;
            }
            else{
                this.set.weight = 0;
                this.set.reps = 0;
                this.set.number=0;
            }
        }
    }
    
    onBodyPartSelected(bodypart:BodyPart){
        if(this.set){
            this.set.exercise=null;
        }
    }
    
    submit(){
        this.setAdded.emit(this.set);
    }
}