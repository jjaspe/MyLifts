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
var Rx_1 = require("rxjs/Rx");
var http_1 = require('@angular/http');
var index_1 = require('../../Session/index');
var ExerciseService = (function () {
    function ExerciseService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.getExercisesUrl = "/Exercises";
        this.postExerciseUrl = "/Exercises/Post";
        this.exercises = [];
    }
    ExerciseService.prototype.initUrls = function () {
        var _this = this;
        this.getExercisesUrl = this.sessionService.session.ApiUrl + this.getExercisesUrl;
        this.postExerciseUrl = this.sessionService.session.ApiUrl + this.postExerciseUrl;
        this.getExercises().subscribe(function (n) { return _this.exercises = n; });
    };
    ExerciseService.prototype.getExercises = function () {
        return this.http.get(this.getExercisesUrl).map(this.extractExerciseData).catch(this.handleError);
    };
    ExerciseService.prototype.getExercise = function (id) {
        return Promise.resolve(this.exercises.filter(function (n) { return n.Id == id; })[0]);
    };
    ExerciseService.prototype.saveExercise = function (exWithBp) {
        var body = JSON.stringify(exWithBp);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.postExerciseUrl, body, options)
            .map(function (res) { return console.log(res); })
            .catch(this.handleError).subscribe(function (r) { });
    };
    ExerciseService.prototype.extractExerciseData = function (res) {
        var body = res.json();
        var exercises = [];
        body.forEach(function (n) { return n.Details = []; });
        return body || {};
    };
    ExerciseService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("Error:" + errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    ExerciseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.SessionService])
    ], ExerciseService);
    return ExerciseService;
}());
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercise.service.js.map