import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/App/Dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    @Output()
    homeButtonClicked=new EventEmitter<any>();
    @Output()
    workoutButtonClicked=new EventEmitter<any>();
    @Output()
    logoutButtonClicked=new EventEmitter<any>();
    constructor() { }

    ngOnInit() { }
    
    onHomeButtonClicked(){
        this.homeButtonClicked.emit(null);
    }

}