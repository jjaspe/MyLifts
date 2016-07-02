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
var index_1 = require("../Sets/shared/index");
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require("rxjs/Rx");
var session_service_1 = require('../Session/session.service');
var WorkoutService = (function () {
    function WorkoutService(http, setService, sessionService) {
        this.http = http;
        this.setService = setService;
        this.sessionService = sessionService;
        this.getWorkoutsUrl = "/Workouts";
        this.getWorkoutsByUserUrl = "/Workouts/GetWorkoutsByUser";
        this.postWorkoutUrl = "/Workouts/Post";
        this.workouts = [];
    }
    WorkoutService.prototype.initUrls = function () {
        this.getWorkoutsUrl = this.sessionService.session.ApiUrl + this.getWorkoutsUrl;
        this.getWorkoutsByUserUrl = this.sessionService.session.ApiUrl + this.getWorkoutsByUserUrl;
        this.postWorkoutUrl = this.sessionService.session.ApiUrl + this.postWorkoutUrl;
    };
    WorkoutService.prototype.fixWorkoutDates = function () {
        this.workouts.forEach(function (el) {
            el.WorkoutDate = new Date(el.WorkoutDate.toString());
        });
    };
    WorkoutService.prototype.fetchWorkouts = function () {
        var _this = this;
        this.getWorkoutsFromAPI().subscribe(function (n) {
            _this.workouts = n;
            _this.fixWorkoutDates();
        });
    };
    WorkoutService.prototype.getWorkoutsFromAPI = function () {
        return this.http.get(this.getWorkoutsUrl).map(this.extractWorkoutData.bind(this)).catch(this.handleError);
    };
    WorkoutService.prototype.getWorkouts = function () {
        return Rx_1.Observable.of(this.workouts);
    };
    WorkoutService.prototype.extractWorkoutData = function (res) {
        var body = res.json();
        return body || {};
    };
    WorkoutService.prototype.getWorkoutByDate = function (user, date) {
        var _this = this;
        date = date || new Date();
        if (user) {
            var userWorkouts = this.workouts.filter(function (a) { return a.UserId === user.Id; });
            if (userWorkouts) {
                var workout_1 = userWorkouts.filter(function (m) { return _this.compareDates(m.WorkoutDate, date); })[0];
                if (workout_1 && (!workout_1.setGroups || workout_1.setGroups.length == 0)) {
                    this.setService.getSetsByWorkout(workout_1).subscribe(function (n) { return workout_1.setGroups = _this.setService.getSetGroups(n); });
                }
                return Rx_1.Observable.of(workout_1);
            }
            else
                return Rx_1.Observable.of(null);
        }
        else {
            return Rx_1.Observable.of(null);
        }
    };
    WorkoutService.prototype.compareDates = function (date1, date2) {
        if (date1 === null || date2 === null)
            return false;
        date1 = this.flattenDate(date1);
        date2 = this.flattenDate(date2);
        return date1.getFullYear === date2.getFullYear && date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };
    WorkoutService.prototype.flattenDate = function (date) {
        date = new Date(date.toString());
        date.setHours(0, 0, 0, 0);
        return date;
    };
    WorkoutService.prototype.getLastSetOfExercise = function (user, exercise) {
        var sortedWorkouts = this.getExerciseHistory(user.Workouts, exercise).
            sort(function (a, b) { return b.WorkoutDate.getUTCDate() - a.WorkoutDate.getUTCDate(); });
        if (sortedWorkouts[0]) {
            var lastOne = sortedWorkouts[0];
            //Find setGroup with exercise, then find last set
            return lastOne.setGroups.filter(function (n) {
                return n.exercise.Name == exercise.Name;
            })[0].
                Sets.sort(function (a, b) { return b.Number - a.Number; })[0];
        }
        else
            return null;
    };
    WorkoutService.prototype.saveWorkout = function (workout) {
        var body = JSON.stringify(workout);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.postWorkoutUrl, body, options)
            .map(function (res) { return console.log(res); })
            .catch(this.handleError).subscribe(function (a) { });
        this.fetchWorkouts();
    };
    WorkoutService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("Error:" + errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    WorkoutService.prototype.getExerciseHistory = function (workouts, exercise) {
        var workoutsWithExercise = workouts.filter(function (n) {
            return n.setGroups.some(function (m) { return m.exercise.Name == exercise.Name; });
        });
        return workoutsWithExercise;
    };
    WorkoutService.prototype.addSetToWorkout = function (workout, set) {
        if (!workout.setGroups) {
            workout.setGroups = [];
        }
        if (workout.setGroups) {
            var group = workout.setGroups.filter(function (n) { return n.exercise.Name == set.exercise.Name; })[0];
            if (group) {
                set.Number = group.Sets.length + 1;
                group.Sets.push(set);
            }
            else {
                set.Number = 1;
                workout.setGroups.push({ exercise: set.exercise, Sets: [set] });
            }
        }
        return workout;
    };
    WorkoutService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, index_1.SetService, session_service_1.SessionService])
    ], WorkoutService);
    return WorkoutService;
}());
exports.WorkoutService = WorkoutService;
//# sourceMappingURL=workout.service.js.map