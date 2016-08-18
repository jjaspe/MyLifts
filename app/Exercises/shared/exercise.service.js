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
var index_1 = require('../../Session/index');
var http_service_1 = require('../../Utilities/http.service');
var ExerciseService = (function () {
    function ExerciseService(httpService, sessionService) {
        this.httpService = httpService;
        this.sessionService = sessionService;
        this.exercisesUrl = "/Exercises";
        this.exercises = [];
    }
    ExerciseService.prototype.initUrls = function () {
        var _this = this;
        this.exercisesUrl = this.sessionService.session.ApiUrl + this.exercisesUrl;
        this.getExercises().subscribe(function (n) { return _this.exercises = n; });
    };
    ExerciseService.prototype.getExercises = function () {
        return this.httpService.get(this.exercisesUrl);
    };
    ExerciseService.prototype.getExercise = function (id) {
        return Promise.resolve(this.exercises.filter(function (n) { return n.Id == id; })[0]);
    };
    ExerciseService.prototype.saveExercise = function (exWithBp) {
        return this.httpService.post(this.exercisesUrl, exWithBp);
    };
    ExerciseService.prototype.deleteExercise = function (exercise) {
    };
    ExerciseService.prototype.setDetails = function (res) {
        var body = res.json();
        var exercises = [];
        body.forEach(function (n) { return n.Details = []; });
    };
    ExerciseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_1.HttpService, index_1.SessionService])
    ], ExerciseService);
    return ExerciseService;
}());
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercise.service.js.map