import { Component, OnInit, Input, ElementRef, OnChanges} from "@angular/core";
import { Observable }  from 'rxjs/Rx';
import { ExerciseSelectionComponent} from '../Exercises/index'
import { User, UserService} from '../User/shared/index'
import { HomeComponent, DashboardComponent} from './index'
import { Workout, WorkoutService, WorkoutListComponent} from '../Workout/index'
import { CONSTANTS } from './CONSTANTS'
import { SetService } from '../Sets/Index'
import { SessionService } from '../Session/index'
import { BodyPartService} from '../BodyParts/index'
import { ExerciseService, ExerciseCreationComponent } from '../Exercises/index'
import { Auth } from '../auth/auth.service'
import { HttpService} from '../Utilities/http.service'
import { LogService} from '../Utilities/log.service'

@Component({
    selector: 'my-app',
    templateUrl: "app/App/app.component.html",
    styleUrls: ["app/App/app.component.css"],
    providers: [UserService, WorkoutService, SetService, SessionService, BodyPartService,
        ExerciseService, Auth,HttpService,LogService],
    directives: [ExerciseSelectionComponent, DashboardComponent, HomeComponent,
        ExerciseCreationComponent, WorkoutListComponent],
})

export class AppComponent implements OnInit, OnChanges {
    @Input() apiUrl: string;
    constants: any = CONSTANTS;
    page: string = CONSTANTS.HomePage;
    userUpdated:boolean=false;
    title = "My Lifts";
    user: User;
    constructor(private userService: UserService, private workoutService: WorkoutService,
        private sessionService: SessionService, private bodyPartService: BodyPartService,
        private exerciseService: ExerciseService, private setService: SetService,
        private elementRef: ElementRef) {

    }

    ngOnInit() {
        let native = this.elementRef.nativeElement;
        this.sessionService.session.ApiUrl = native.getAttribute('apiUrl');
        this.initServiceUrls();
        this.userService.getLoggedInUser().subscribe(a =>{
            this.user = a;
            this.userUpdated=true;
            setTimeout(()=>this.userUpdated=false,0);
        });
        this.workoutService.fetchWorkouts();        
    }
    
    ngOnChanges(){
        
    }

    initServiceUrls() {
        this.userService.initUrls();
        this.workoutService.initUrls();
        this.bodyPartService.initUrls();
        this.exerciseService.initUrls();
        this.setService.initUrls();
    }

    goToExerciseSelection() {
        this.page = CONSTANTS.AddExercisesPage;
    }

    goToAddExercises() {
        this.page = CONSTANTS.AddExercisesPage;
    }

    goToHome() {
        this.page = CONSTANTS.HomePage;
    }

    goToWorkouts() {
        this.page = CONSTANTS.WorkoutsPage
    }
}

