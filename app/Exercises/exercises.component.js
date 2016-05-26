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
var index_1 = require("../BodyParts/index");
var ExercisesComponent = (function () {
    function ExercisesComponent(bodyPartService) {
        this.bodyPartService = bodyPartService;
        this.title = "Exercises";
        this.exerciseSelected = new core_1.EventEmitter();
    }
    ExercisesComponent.prototype.ngOnChanges = function (changes) {
        for (var prop in changes) {
            if (prop == "selectedBodyPart") {
                this.exercises = this.bodyPartService.getExercisesFromBodyPart(this.selectedBodyPart);
                this.selectedExercise = null;
                break;
            }
        }
    };
    ExercisesComponent.prototype.onExerciseSelected = function (exercise) {
        this.selectedExercise = exercise;
        this.exerciseSelected.emit(exercise);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ExercisesComponent.prototype, "exerciseSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.BodyPart)
    ], ExercisesComponent.prototype, "selectedBodyPart", void 0);
    ExercisesComponent = __decorate([
        core_1.Component({
            selector: 'my-exercises',
            templateUrl: "app/Exercises/exercises.component.html",
            styleUrls: ["app/Exercises/exercises.component.css"]
        }), 
        __metadata('design:paramtypes', [index_1.BodyPartService])
    ], ExercisesComponent);
    return ExercisesComponent;
}());
exports.ExercisesComponent = ExercisesComponent;
//# sourceMappingURL=exercises.component.js.map