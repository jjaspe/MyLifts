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
var index_1 = require('../BodyParts/index');
var index_2 = require('../Exercises/index');
var index_3 = require('../Sets/index');
require('rxjs/add/operator/share');
var ExerciseSelectionComponent = (function () {
    function ExerciseSelectionComponent(exerciseService, bodypartService) {
        this.exerciseService = exerciseService;
        this.bodypartService = bodypartService;
        this.exerciseSelected = new core_1.EventEmitter();
    }
    ExerciseSelectionComponent.prototype.ngOnInit = function () {
        this.getBodyParts();
        this.selectedBodyPart = this.bodyparts[0];
    };
    ExerciseSelectionComponent.prototype.onBodyPartSelected = function (bodypart) {
        this.selectedBodyPart = bodypart;
    };
    ExerciseSelectionComponent.prototype.onExerciseSelected = function (exercise) {
        this.selectedExercise = exercise;
        this.exerciseSelected.emit(exercise);
    };
    ExerciseSelectionComponent.prototype.getBodyParts = function () {
        this.bodyparts = this.bodypartService.getBodyParts();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ExerciseSelectionComponent.prototype, "exerciseSelected", void 0);
    ExerciseSelectionComponent = __decorate([
        core_1.Component({
            selector: 'exercise-selection',
            templateUrl: 'app/ExerciseSelection/exerciseSelection.component.html',
            directives: [index_1.BodyPartsComponent, index_2.ExercisesComponent, index_3.SetFormComponent],
            providers: [index_1.BodyPartService, index_2.ExerciseService],
            styleUrls: ['app/App/app.component.css']
        }), 
        __metadata('design:paramtypes', [index_2.ExerciseService, index_1.BodyPartService])
    ], ExerciseSelectionComponent);
    return ExerciseSelectionComponent;
}());
exports.ExerciseSelectionComponent = ExerciseSelectionComponent;
//# sourceMappingURL=exerciseSelection.component.js.map