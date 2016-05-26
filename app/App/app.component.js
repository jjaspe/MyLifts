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
var core_1 = require("@angular/core");
var index_1 = require('../ExerciseSelection/index');
var index_2 = require('../User/index');
var index_3 = require('./index');
var index_4 = require('../Workout/index');
var AppComponent = (function () {
    function AppComponent(userService, workoutService) {
        this.userService = userService;
        this.workoutService = workoutService;
        this.page = 0;
        this.title = "My Lifts";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser(0).then(function (user) { return _this.user = user; });
    };
    AppComponent.prototype.goToExerciseSelection = function () {
        this.page = 1;
    };
    AppComponent.prototype.goToHome = function () {
        this.page = 0;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: "app/App/app.component.html",
            styleUrls: ["app/App/app.component.css"],
            directives: [index_1.ExerciseSelectionComponent, index_3.DashboardComponent, index_3.HomeComponent],
            providers: [index_2.UserService, index_4.WorkoutService]
        }), 
        __metadata('design:paramtypes', [index_2.UserService, index_4.WorkoutService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map