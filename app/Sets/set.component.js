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
var index_1 = require("./index");
var core_1 = require("@angular/core");
var SetComponent = (function () {
    function SetComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', index_1.Set)
    ], SetComponent.prototype, "set", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SetComponent.prototype, "isSelected", void 0);
    SetComponent = __decorate([
        core_1.Component({
            selector: "set",
            templateUrl: "app/Sets/set.component.html",
            styleUrls: ["app/Sets/set.component.css"],
            directives: [index_1.DetailComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SetComponent);
    return SetComponent;
}());
exports.SetComponent = SetComponent;
//# sourceMappingURL=set.component.js.map