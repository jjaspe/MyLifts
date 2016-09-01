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
var exercise_service_1 = require("../../Exercises/shared/exercise.service");
var http_1 = require('@angular/http');
var core_1 = require("@angular/core");
var Rx_1 = require('rxjs/Rx');
var index_1 = require('../../Session/index');
var BodyPartService = (function () {
    function BodyPartService(exerciseService, http, sessionService) {
        this.exerciseService = exerciseService;
        this.http = http;
        this.sessionService = sessionService;
        this.url = "/Bodyparts";
        this.bodyParts = [];
    }
    BodyPartService.prototype.initUrls = function () {
        var _this = this;
        this.url = this.sessionService.session.ApiUrl + this.url;
        this.getBodyParts().subscribe(function (n) { return _this.bodyParts; });
    };
    BodyPartService.prototype.getBodyParts = function () {
        return this.http.get(this.url).map(this.extractBodyPartData.bind(this)).catch(this.handleError);
    };
    BodyPartService.prototype.extractBodyPartData = function (res) {
        var body = res.json();
        return body || {};
    };
    BodyPartService.prototype.getExercises = function (exerciseIds) {
        var _this = this;
        var exercises = [];
        if (exerciseIds)
            exerciseIds.forEach(function (n) { return _this.exerciseService.getExercise(n)
                .then(function (m) { return exercises.push(m); }); });
        return exercises;
    };
    BodyPartService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    BodyPartService.prototype.getMockBodyParts = function () {
        return [];
    };
    BodyPartService.prototype.getExercisesFromBodyPart = function (bodypart) {
        if (bodypart)
            return this.bodyParts.find(function (n) { return n.Id === bodypart.Id; }).exercises;
    };
    BodyPartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [exercise_service_1.ExerciseService, http_1.Http, index_1.SessionService])
    ], BodyPartService);
    return BodyPartService;
}());
exports.BodyPartService = BodyPartService;
//# sourceMappingURL=bodyParts.service.js.map