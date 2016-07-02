"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_service_1 = require('../../auth/auth.service');
var DashboardComponent = (function () {
    function DashboardComponent(auth) {
        this.auth = auth;
        this.homeButtonClicked = new core_1.EventEmitter();
        this.workoutsButtonClicked = new core_1.EventEmitter();
        this.logoutButtonClicked = new core_1.EventEmitter();
        this.addExercisesClicked = new core_1.EventEmitter();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.auth.tryPreviouslyLoggedIn();
    };
    DashboardComponent.prototype.onHomeButtonClicked = function () {
        this.homeButtonClicked.emit(null);
    };
    DashboardComponent.prototype.addExercises = function () {
        this.addExercisesClicked.emit(null);
    };
    DashboardComponent.prototype.goToWorkouts = function () {
        this.workoutsButtonClicked.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "homeButtonClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "workoutsButtonClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "logoutButtonClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "addExercisesClicked", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/App/Dashboard/dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map