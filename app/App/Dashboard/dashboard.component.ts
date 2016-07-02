import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Auth } from '../../auth/auth.service'

@Component({
    selector: 'dashboard',
    templateUrl: 'app/App/Dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    @Output() homeButtonClicked=new EventEmitter<any>();
    @Output() workoutsButtonClicked=new EventEmitter<any>();
    @Output() logoutButtonClicked=new EventEmitter<any>();
    @Output() addExercisesClicked=new EventEmitter<any>();
    constructor(private auth:Auth) { }

    ngOnInit() { 
        this.auth.tryPreviouslyLoggedIn();
    }
    
    onHomeButtonClicked(){
        this.homeButtonClicked.emit(null);
    }
    
    addExercises(){
        this.addExercisesClicked.emit(null);
    }
    
    goToWorkouts(){
        this.workoutsButtonClicked.emit(null);
    }

}