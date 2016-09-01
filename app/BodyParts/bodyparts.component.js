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
var bodyParts_service_1 = require("./shared/bodyParts.service");
var BodyPartsComponent = (function () {
    function BodyPartsComponent(bodyPartService) {
        this.bodyPartService = bodyPartService;
        this.title = "Muscle Groups";
        this.bodyparts = [];
        this.realBodyParts = [];
        this.selected = new core_1.EventEmitter();
    }
    BodyPartsComponent.prototype.onSelected = function (bodypart) {
        this.selected.emit(bodypart);
    };
    BodyPartsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bodyPartService.getBodyParts().subscribe(function (n) { return _this.setRealBodyParts(n); });
    };
    BodyPartsComponent.prototype.setRealBodyParts = function (bodyparts) {
        bodyparts.forEach(function (n) { return n.exercises = []; });
        this.realBodyParts = bodyparts;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BodyPartsComponent.prototype, "bodyparts", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BodyPartsComponent.prototype, "selected", void 0);
    BodyPartsComponent = __decorate([
        core_1.Component({
            selector: "bodyparts",
            templateUrl: "app/BodyParts/bodyParts.component.html",
            styleUrls: ["app/BodyParts/bodyParts.component.css"]
        }), 
        __metadata('design:paramtypes', [bodyParts_service_1.BodyPartService])
    ], BodyPartsComponent);
    return BodyPartsComponent;
}());
exports.BodyPartsComponent = BodyPartsComponent;
//# sourceMappingURL=bodyparts.component.js.map