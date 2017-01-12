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
var index_1 = require('../Exercises/index');
var index_2 = require('../User/shared/index');
var index_3 = require('./index');
var index_4 = require('../Workout/index');
var CONSTANTS_1 = require('./CONSTANTS');
var Index_1 = require('../Sets/Index');
var index_5 = require('../Session/index');
var index_6 = require('../BodyParts/index');
var index_7 = require('../Exercises/index');
var auth_service_1 = require('../auth/auth.service');
var http_service_1 = require('../Utilities/http.service');
var log_service_1 = require('../Utilities/log.service');
var AppComponent = (function () {
    function AppComponent(userService, workoutService, sessionService, bodyPartService, exerciseService, setService, elementRef) {
        this.userService = userService;
        this.workoutService = workoutService;
        this.sessionService = sessionService;
        this.bodyPartService = bodyPartService;
        this.exerciseService = exerciseService;
        this.setService = setService;
        this.elementRef = elementRef;
        this.constants = CONSTANTS_1.CONSTANTS;
        this.page = CONSTANTS_1.CONSTANTS.HomePage;
        this.userUpdated = false;
        this.title = "My Lifts";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var native = this.elementRef.nativeElement;
        this.sessionService.session.ApiUrl = native.getAttribute('apiUrl');
        this.initServiceUrls();
        this.userService.getLoggedInUser().subscribe(function (a) {
            _this.user = a;
            _this.userUpdated = true;
            setTimeout(function () { return _this.userUpdated = false; }, 0);
        });
        this.workoutService.fetchWorkouts();
    };
    AppComponent.prototype.ngOnChanges = function () {
    };
    AppComponent.prototype.initServiceUrls = function () {
        this.userService.initUrls();
        this.workoutService.initUrls();
        this.bodyPartService.initUrls();
        this.exerciseService.initUrls();
        this.setService.initUrls();
    };
    AppComponent.prototype.goToExerciseSelection = function () {
        this.page = CONSTANTS_1.CONSTANTS.AddExercisesPage;
    };
    AppComponent.prototype.goToAddExercises = function () {
        this.page = CONSTANTS_1.CONSTANTS.AddExercisesPage;
    };
    AppComponent.prototype.goToHome = function () {
        this.page = CONSTANTS_1.CONSTANTS.HomePage;
    };
    AppComponent.prototype.goToWorkouts = function () {
        this.page = CONSTANTS_1.CONSTANTS.WorkoutsPage;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AppComponent.prototype, "apiUrl", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: "app/App/app.component.html",
            styleUrls: ["app/App/app.component.css"],
            providers: [index_2.UserService, index_4.WorkoutService, Index_1.SetService, index_5.SessionService, index_6.BodyPartService,
                index_7.ExerciseService, auth_service_1.Auth, http_service_1.HttpService, log_service_1.LogService],
            directives: [index_1.ExerciseSelectionComponent, index_3.DashboardComponent, index_3.HomeComponent,
                index_7.ExerciseCreationComponent, index_4.WorkoutListComponent],
        }), 
        __metadata('design:paramtypes', [index_2.UserService, index_4.WorkoutService, index_5.SessionService, index_6.BodyPartService, index_7.ExerciseService, Index_1.SetService, core_1.ElementRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map