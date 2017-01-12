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
var index_1 = require('./shared/index');
var index_2 = require("../Sets/index");
var WorkoutComponent = (function () {
    function WorkoutComponent(setService, workoutService) {
        this.setService = setService;
        this.workoutService = workoutService;
    }
    WorkoutComponent.prototype.ngOnInit = function () { };
    WorkoutComponent.prototype.setSelected = function (set) {
        this.selectedSet = set;
    };
    WorkoutComponent.prototype.deleteSet = function () {
        var _this = this;
        this.workoutService.removeSetFromWorkout(this.workout, this.selectedSet, function (savedWorkout) {
            _this.workout = savedWorkout;
            _this.selectedSet = null;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.Workout)
    ], WorkoutComponent.prototype, "workout", void 0);
    WorkoutComponent = __decorate([
        core_1.Component({
            selector: 'workout',
            templateUrl: 'app/Workout/workout.component.html',
            directives: [index_2.SetGroupListComponent]
        }), 
        __metadata('design:paramtypes', [index_2.SetService, index_1.WorkoutService])
    ], WorkoutComponent);
    return WorkoutComponent;
}());
exports.WorkoutComponent = WorkoutComponent;
//# sourceMappingURL=workout.component.js.map