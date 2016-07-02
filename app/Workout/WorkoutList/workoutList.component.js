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
var index_1 = require('../index');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var index_2 = require('../../User/index');
var WorkoutListComponent = (function () {
    function WorkoutListComponent(workoutService, userService) {
        var _this = this;
        this.workoutService = workoutService;
        this.userService = userService;
        this.selectedDate = new Date();
        this.customClass = [];
        this.disabledDates = [];
        this.workouts = [];
        this.user = this.userService.inMemoryUser;
        this.userService.getLoggedInUser().subscribe(function (a) {
            _this.user = a;
        });
        this.workoutService.getWorkouts().subscribe(function (n) { return _this.setCustomClassesForWorkouts(n); });
        this.onDateChangedEvent(this.selectedDate);
    }
    WorkoutListComponent.prototype.ngOnInit = function () { };
    WorkoutListComponent.prototype.setCustomClassesForWorkouts = function (workouts) {
        var _this = this;
        this.workouts = workouts;
        workouts.forEach(function (n) {
            _this.customClass.push({
                date: _this.flattenDate(n.WorkoutDate), mode: "day",
                clazz: "has-workout"
            });
            _this.disabledDates.push({ date: _this.flattenDate(n.WorkoutDate), mode: "day" });
        });
    };
    WorkoutListComponent.prototype.flattenDate = function (date) {
        date = new Date(date.toString());
        date.setHours(0, 0, 0, 0);
        return date;
    };
    WorkoutListComponent.prototype.onDateChangedEvent = function (date) {
        var _this = this;
        setTimeout(function () {
            _this.workoutService.getWorkoutByDate(_this.user, _this.selectedDate).subscribe(function (w) {
                _this.selectedWorkout = w;
            });
        }, 10);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], WorkoutListComponent.prototype, "selectedDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.Workout)
    ], WorkoutListComponent.prototype, "selectedWorkout", void 0);
    WorkoutListComponent = __decorate([
        core_1.Component({
            selector: 'workout-list',
            templateUrl: 'app/Workout/WorkoutList/workoutList.component.html',
            directives: [ng2_bootstrap_1.DatePickerComponent, index_1.WorkoutComponent],
            styleUrls: ["app/Workout/WorkoutList/workoutList.component.css"]
        }), 
        __metadata('design:paramtypes', [index_1.WorkoutService, index_2.UserService])
    ], WorkoutListComponent);
    return WorkoutListComponent;
}());
exports.WorkoutListComponent = WorkoutListComponent;
//# sourceMappingURL=workoutList.component.js.map