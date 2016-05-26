import {Component,OnInit,Input} from "@angular/core";
import {ExerciseSelectionComponent} from '../ExerciseSelection/index'
import {User,UserService} from '../User/index'
import {HomeComponent,DashboardComponent} from './index'
import {Workout,WorkoutService} from '../Workout/index'


@Component({
    selector:'my-app',
    templateUrl:"app/App/app.component.html",
    styleUrls:["app/App/app.component.css"],
    directives:[ExerciseSelectionComponent,DashboardComponent,HomeComponent],
    providers:[UserService,WorkoutService]
})

export class AppComponent implements OnInit{
    page:number=0;
    title = "My Lifts";
    user:User;
    constructor(private userService:UserService,private workoutService:WorkoutService){ 
    }
    
    ngOnInit(){
        this.userService.getUser(0).then(user=>this.user=user);
    }
    
    goToExerciseSelection(){
        this.page=1;
    }
    
    goToHome(){
        this.page=0;
    }
}

